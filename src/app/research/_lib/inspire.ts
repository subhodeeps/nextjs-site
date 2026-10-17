// src/app/research/_lib/inspire.ts
//
// Fetches each paper's details from the INSPIRE-HEP API and turns them into what
// the Research page shows. It runs only when the site is built (and in `npm run
// dev`), never in the visitor's browser, so the published site does not depend
// on INSPIRE being up. If INSPIRE cannot be reached during a build, the build
// stops with an error and the site already online stays as it is.
import katex from 'katex'
import type { PaperEntry } from '../_data/papers'

/** A paper, ready to show */
export type Paper = {
    inspire: string // the INSPIRE record number
    kind: 'preprint' | 'published' | 'thesis'
    title: string
    authors: string[] // "First Last"
    supervisors: string[] // for a thesis, "First Last"
    institution?: string // for a thesis, the university
    venue?: { label: string; url?: string } // the journal reference, or the thesis degree and year
    arxiv?: { label: string; url: string } // the arXiv number
    abstractHtml?: string // the abstract as HTML, with any $...$ maths set by KaTeX
    bibtex?: string
    links: {
        site: 'inspire' | 'scholar' | 'semantic' | 'ads' | 'wos'
        url: string
        count?: number
    }[]
}

// The parts of an INSPIRE record that are used here
type InspireRecord = {
    titles: { title: string }[]
    authors?: { full_name: string; inspire_roles?: string[] }[]
    publication_info?: {
        journal_title?: string
        journal_volume?: string
        artid?: string
        page_start?: string
        year?: number
    }[]
    dois?: { value: string }[]
    arxiv_eprints?: { value: string; categories?: string[] }[]
    abstracts?: { value: string; source?: string }[]
    citation_count?: number
    document_type?: string[]
    thesis_info?: { degree_type?: string; date?: string; institutions?: { name: string }[] }
    urls?: { value: string }[]
}

/**
 * Fetches an address, waiting and trying again if INSPIRE says "too many requests".
 *
 * Next.js keeps a copy of each answer in .next/cache, and Vercel keeps that folder
 * from one build to the next. `revalidate: 43200` lets a copy be reused for 12
 * hours at most. The site is rebuilt every day by
 * .github/workflows/refresh-citations.yml, so each of those builds fetches fresh
 * citation counts, while builds in between, and `npm run dev`, reuse the copies.
 */
async function get(url: string): Promise<Response> {
    for (let attempt = 0; ; attempt++) {
        const response = await fetch(url, { next: { revalidate: 43200 } })
        if (response.ok) return response
        if (response.status !== 429 || attempt === 3)
            throw new Error(`INSPIRE answered ${response.status} for ${url}`)
        await new Promise((resolve) => setTimeout(resolve, 2000 * (attempt + 1)))
    }
}

/** "Bohra, Sunil Singh" becomes "Sunil Singh Bohra" */
function displayName(fullName: string) {
    const [last, ...first] = fullName.split(', ')
    return first.length ? `${first.join(' ')} ${last}` : fullName
}

/** "Phys.Rev.D" becomes "Phys. Rev. D" */
function journalName(title: string) {
    return title.replace(/\.(?=\S)/g, '. ').trim()
}

/** Escapes text for use inside HTML */
function escapeHtml(text: string) {
    return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

/** The abstract as HTML: plain text, with each $...$ set as maths by KaTeX */
function abstractHtml(text: string) {
    return text
        .split(/(\$[^$]+\$)/)
        .map((part) =>
            part.startsWith('$') && part.endsWith('$') && part.length > 2
                ? katex.renderToString(part.slice(1, -1), { throwOnError: false })
                : escapeHtml(part),
        )
        .join('')
}

/** Fetches one paper from INSPIRE and prepares it for the page */
export async function getPaper(entry: PaperEntry): Promise<Paper> {
    const api = `https://inspirehep.net/api/literature/${entry.inspire}`
    const [record, bibtex] = await Promise.all([
        get(api).then(async (r) => ((await r.json()) as { metadata: InspireRecord }).metadata),
        get(`${api}?format=bibtex`).then((r) => r.text()),
    ])

    const title = record.titles[0].title
    const journal = record.publication_info?.find((p) => p.journal_title)
    const doi = record.dois?.[0]?.value
    const arxiv = record.arxiv_eprints?.[0]
    const isThesis = record.document_type?.includes('thesis') ?? false
    const kind = isThesis ? 'thesis' : journal ? 'published' : 'preprint'

    // The first chips: the journal reference (linked to the DOI), or for the
    // thesis its degree and year (linked to its record at the university); then
    // the arXiv number, with its subject category for a preprint
    let venue: Paper['venue']
    if (isThesis) {
        const info = record.thesis_info ?? {}
        const degree = info.degree_type === 'phd' ? 'PhD thesis' : 'Thesis'
        const year = info.date?.slice(0, 4)
        venue = {
            label: degree + (year ? ` (${year})` : ''),
            url: record.urls?.[0]?.value,
        }
    } else if (journal) {
        const where = journal.artid ?? journal.page_start
        const label =
            `${journalName(journal.journal_title!)}` +
            (journal.journal_volume ? ` ${journal.journal_volume}` : '') +
            (where ? `, ${where}` : '') +
            (journal.year ? ` (${journal.year})` : '')
        venue = { label, url: doi ? `https://doi.org/${doi}` : undefined }
    }
    let arxivChip: Paper['arxiv']
    if (arxiv) {
        const category = !journal ? arxiv.categories?.[0] : undefined
        arxivChip = {
            label: `arXiv:${arxiv.value}` + (category ? ` [${category}]` : ''),
            url: `https://arxiv.org/abs/${arxiv.value}`,
        }
    }

    // The arXiv abstract when INSPIRE has it, as the authors wrote it (its maths is
    // set by KaTeX); the journal's version can contain references flattened into
    // a jumble, such as "097JHEPFG1029-8479..."
    const abstract = record.abstracts?.find((a) => a.source === 'arXiv') ?? record.abstracts?.[0]

    // INSPIRE lists a thesis supervisor among the authors, with the role "supervisor"
    const people = record.authors ?? []
    const isSupervisor = (a: (typeof people)[number]) => a.inspire_roles?.includes('supervisor')

    // The chips for the citation databases. Google Scholar and Semantic Scholar
    // are searched for the exact title; NASA ADS finds a paper by its arXiv number.
    const quotedTitle = encodeURIComponent(`"${title}"`)
    const links: Paper['links'] = [
        {
            site: 'inspire',
            url: `https://inspirehep.net/literature/${entry.inspire}`,
            count: record.citation_count,
        },
        { site: 'scholar', url: `https://scholar.google.com/scholar?q=${quotedTitle}` },
    ]
    if (!isThesis) {
        links.push({
            site: 'semantic',
            url: `https://www.semanticscholar.org/search?q=${encodeURIComponent(title)}`,
        })
        if (arxiv)
            links.push({
                site: 'ads',
                url: `https://ui.adsabs.harvard.edu/abs/arXiv:${arxiv.value}`,
            })
        if (entry.wos) links.push({ site: 'wos', url: entry.wos })
    }

    return {
        inspire: entry.inspire,
        kind,
        title,
        authors: people.filter((a) => !isSupervisor(a)).map((a) => displayName(a.full_name)),
        supervisors: people.filter(isSupervisor).map((a) => displayName(a.full_name)),
        institution: isThesis ? record.thesis_info?.institutions?.[0]?.name : undefined,
        venue,
        arxiv: arxivChip,
        abstractHtml: abstract ? abstractHtml(abstract.value) : undefined,
        bibtex: bibtex.trim() || undefined,
        links,
    }
}

/** Fetches several papers one after another, which keeps within INSPIRE's request limits */
export async function getPapers(entries: PaperEntry[]): Promise<Paper[]> {
    const result: Paper[] = []
    for (const entry of entries) result.push(await getPaper(entry))
    return result
}
