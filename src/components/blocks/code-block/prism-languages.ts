// src/components/blocks/code-block/prism-languages.ts
//
// prism-react-renderer highlights only some languages by itself: Python, C, C++,
// JavaScript, TypeScript, JSON, YAML and Markdown, among others. This file adds
// more from the prismjs package, for code blocks such as ```bash or ```julia.
// Each name in the comments is what goes after the opening ```; to add another
// language, find its file in node_modules/prismjs/components/.
import './prism-global'
import 'prismjs/components/prism-bash' // bash, shell, sh
import 'prismjs/components/prism-julia' // julia
import 'prismjs/components/prism-fortran' // fortran
import 'prismjs/components/prism-latex' // latex, tex
import 'prismjs/components/prism-wolfram' // mathematica, wolfram
import 'prismjs/components/prism-haskell' // haskell
import 'prismjs/components/prism-matlab' // matlab
import 'prismjs/components/prism-toml' // toml
import 'prismjs/components/prism-diff' // diff
