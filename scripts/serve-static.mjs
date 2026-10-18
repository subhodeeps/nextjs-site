// scripts/serve-static.mjs
//
// Serves the production build in out/ at http://localhost:4000 (or the port in
// PORT), as Vercel serves it: /about is out/about.html, /blog/my-post is
// out/blog/my-post.html, and an address that matches nothing gets out/404.html.
// It needs nothing beyond Node.js itself. `scripts/dev-env.sh serve` builds the
// site and then runs it; `npm start` runs it on a build made before.
import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { extname, join, normalize } from 'node:path'

const root = join(process.cwd(), 'out')
const port = Number(process.env.PORT) || 4000

const types = {
    '.html': 'text/html; charset=utf-8',
    '.txt': 'text/plain; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.json': 'application/json',
    '.xml': 'application/xml',
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
    '.ico': 'image/x-icon',
    '.woff2': 'font/woff2',
    '.pdf': 'application/pdf',
}

/** The path, if it is a file */
async function file(path) {
    try {
        return (await stat(path)).isFile() ? path : null
    } catch {
        return null
    }
}

createServer(async (request, response) => {
    // normalize() removes any ../, so that nothing outside out/ is served
    const address = normalize(decodeURIComponent(new URL(request.url, 'http://x').pathname))
    const base = join(root, address)
    const found =
        (await file(base)) || (await file(`${base}.html`)) || (await file(join(base, 'index.html')))
    const path = found ?? join(root, '404.html')

    response.writeHead(found ? 200 : 404, {
        'Content-Type': types[extname(path)] ?? 'application/octet-stream',
    })
    response.end(await readFile(path))
}).listen(port, '127.0.0.1', () => {
    console.log(`Serving out/ at http://localhost:${port} (Ctrl+C stops it)`)
})
