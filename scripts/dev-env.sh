#!/usr/bin/env bash
#
# scripts/dev-env.sh
#
# Sets up this site on a new computer, running macOS or Linux (Arch Linux, for
# instance), and runs it on localhost. Node.js, at the version written in
# .node-version, is downloaded into .node/ inside the project, in the way a
# Python virtual environment is made, so nothing is installed for the rest of
# the system and no sudo is needed. Run `scripts/dev-env.sh` alone for the list
# of commands. dev, build and serve run the setup first whenever it is needed.
set -euo pipefail

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$root"
version="$(tr -d ' \r\n' < .node-version)"
node_dir="$root/.node"

usage() {
    cat <<'EOF'
Usage: scripts/dev-env.sh <command>

  setup   Node.js, at the version in .node-version, in .node/; then the packages
  dev     the development server, at http://localhost:3000
  build   the production build, into out/
  serve   the production build, served at http://localhost:4000
  plots   a Python environment in .venv/ with amore, for drawing plots for posts

PORT=5000 before dev or serve changes the port. To use the project's node and
npm in a shell of your own, run `. scripts/activate`.
EOF
}

say() { printf '\033[1m==>\033[0m %s\n' "$*"; }
fail() {
    printf 'error: %s\n' "$*" >&2
    exit 1
}

# Stops with a hint if a command is missing; $2 is the Arch Linux package
need() {
    command -v "$1" >/dev/null 2>&1 && return
    case "$(uname -s)" in
        Darwin) fail "$1 is missing; the command line tools provide it: xcode-select --install" ;;
        *) fail "$1 is missing; on Arch Linux: sudo pacman -S --needed $2" ;;
    esac
}

# Node.js in .node/, at the version in .node-version, checked against the
# checksum that nodejs.org publishes for it
install_node() {
    if [ -x "$node_dir/bin/node" ] && [ "$("$node_dir/bin/node" --version)" = "v$version" ]; then
        return
    fi
    need curl curl
    need tar tar
    case "$(uname -s)" in
        Darwin) os=darwin ;;
        Linux) os=linux ;;
        *) fail "this script supports macOS and Linux, not $(uname -s)" ;;
    esac
    case "$(uname -m)" in
        arm64 | aarch64) arch=arm64 ;;
        x86_64 | amd64) arch=x64 ;;
        *) fail "there is no Node.js download for the processor $(uname -m)" ;;
    esac

    name="node-v$version-$os-$arch"
    url="https://nodejs.org/dist/v$version"
    tmp="$(mktemp -d)"
    trap 'rm -rf "$tmp"' EXIT

    say "Downloading Node.js $version for $os-$arch"
    curl -fsSL "$url/$name.tar.gz" -o "$tmp/$name.tar.gz"
    curl -fsSL "$url/SHASUMS256.txt" -o "$tmp/SHASUMS256.txt"

    expected="$(grep " $name.tar.gz\$" "$tmp/SHASUMS256.txt" | cut -d ' ' -f 1)"
    if command -v sha256sum >/dev/null 2>&1; then
        actual="$(sha256sum "$tmp/$name.tar.gz" | cut -d ' ' -f 1)"
    else
        actual="$(shasum -a 256 "$tmp/$name.tar.gz" | cut -d ' ' -f 1)"
    fi
    if [ -z "$expected" ] || [ "$expected" != "$actual" ]; then
        fail "the downloaded Node.js does not match its checksum"
    fi

    rm -rf "$node_dir"
    mkdir -p "$node_dir"
    tar -xzf "$tmp/$name.tar.gz" -C "$node_dir" --strip-components=1
    say "Node.js $("$node_dir/bin/node" --version) is in .node/"
}

# The packages, installed with that Node.js whenever package-lock.json is newer
# than node_modules/, or node_modules/ was installed with another version
install_packages() {
    if [ -f node_modules/.package-lock.json ] &&
        [ node_modules/.package-lock.json -nt package-lock.json ] &&
        [ "$(cat node_modules/.node-version 2>/dev/null)" = "$version" ]; then
        return
    fi
    say "Installing the packages (npm ci)"
    npm ci
    echo "$version" > node_modules/.node-version
}

setup() {
    install_node
    export PATH="$node_dir/bin:$PATH"
    install_packages
}

# The build rewrites next-env.d.ts; it is put back afterwards, unless it had
# changes of its own before the build
build() {
    setup
    restore=no
    if command -v git >/dev/null 2>&1 && git diff --quiet -- next-env.d.ts 2>/dev/null; then
        restore=yes
    fi
    npm run build
    if [ "$restore" = yes ]; then
        git checkout -- next-env.d.ts
    fi
}

# .venv/ with amore (https://github.com/subhodeeps/amore.mplstyle), for the
# scripts in aux/ that draw the plots in posts
plots() {
    need python3 python
    need git git
    if [ ! -x .venv/bin/python ]; then
        say "Making the Python environment .venv/"
        python3 -m venv .venv
    fi
    say "Installing amore into .venv/"
    .venv/bin/pip install --quiet --upgrade pip
    .venv/bin/pip install --quiet "git+https://github.com/subhodeeps/amore.mplstyle.git"
    if ! command -v latex >/dev/null 2>&1 || ! command -v dvipng >/dev/null 2>&1; then
        say "amore also needs LaTeX, with latex and dvipng: MacTeX on macOS; on Arch Linux,"
        say "sudo pacman -S --needed texlive-basic texlive-latexextra texlive-fontsextra texlive-binextra"
    fi
    say "Draw a plot with: .venv/bin/python aux/<post>/<script>.py"
}

case "${1:-}" in
    setup) setup ;;
    dev)
        setup
        exec npm run dev -- --port "${PORT:-3000}"
        ;;
    build) build ;;
    serve)
        build
        PORT="${PORT:-4000}" exec node scripts/serve-static.mjs
        ;;
    plots) plots ;;
    *) usage ;;
esac
