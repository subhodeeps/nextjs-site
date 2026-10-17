import fs from "fs"
import path from "path"

// Link-preview (Open Graph / Twitter) images all live in public/og/.
// ogImages("research") uses public/og/research.jpg (or .jpeg/.png/.webp) if it
// exists, then tries any further names given, then public/og/default.*.
// If none of them exist, the page gets no preview image.
const OG_DIR = path.join(process.cwd(), "public", "og")
const EXTENSIONS = ["jpg", "jpeg", "png", "webp"]

export function ogImages(...names: string[]): string[] {
  for (const name of [...names, "default"]) {
    for (const ext of EXTENSIONS) {
      const file = `${name}.${ext}`
      if (fs.existsSync(path.join(OG_DIR, file))) return [`/og/${file}`]
    }
  }
  return []
}
