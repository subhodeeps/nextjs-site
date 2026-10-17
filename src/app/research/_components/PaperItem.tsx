// src/app/research/_components/PaperItem.tsx
//
// One paper on the Research page: the title (linked to INSPIRE), the authors,
// and two rows of small chips under them, in the manner of al-folio. The first
// row has the journal reference and the arXiv number, and "abs" and "bib", which
// open the abstract and the BibTeX under the paper; the second row links to the
// paper in the citation databases. It runs in the browser ('use client' below), because
// the abs and bib chips react to clicks. The details come from ../_lib/inspire.ts.
'use client'

import { useState } from 'react'
import { SiClarivate, SiInspire, SiNasa, SiSemanticscholar } from 'react-icons/si'
import { FaGraduationCap } from 'react-icons/fa6'
import { cn } from '@/lib/utils/utils'
import type { Paper } from '../_lib/inspire'

// The look shared by all chips: small, outlined and faint until hovered
const chip =
    'inline-flex items-center gap-1 rounded border px-1.5 py-0.5 text-[0.6875rem] leading-none transition-colors ' +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background'
const quiet = 'border-border text-muted-foreground hover:border-accent-muted hover:text-accent'
const active = 'border-accent-muted text-accent'
// The coloured chips, from the amore palettes, so that they stand apart from the
// purple titles and links: the journal in blue (the colour of Physical Review D),
// the arXiv number in crimson (arXiv's red) and the thesis in teal. Each has a
// faint tint of its colour behind it; the dark:... classes are for the dark theme.
const journal =
    'border-amore-blue-main/60 bg-amore-blue-light/30 text-amore-blue-ink hover:border-amore-blue-main ' +
    'dark:border-amore-blue-main/40 dark:bg-amore-blue-main/10 dark:text-amore-blue-main'
const arxiv =
    'border-amore-red-main/60 bg-amore-red-shade text-amore-red-ink hover:border-amore-red-main ' +
    'dark:border-amore-red-main/40 dark:bg-amore-red-main/10 dark:text-amore-red-main'
const thesis =
    'border-amore-teal-main/60 bg-amore-teal-shade text-amore-teal-ink hover:border-amore-teal-main ' +
    'dark:border-amore-teal-main/40 dark:bg-amore-teal-main/10 dark:text-amore-teal-main'

// Each citation database: its icon and its name on the chip (with the full name
// shown when the pointer rests on it)
const sites = {
    inspire: { icon: SiInspire, label: 'inspire', name: 'INSPIRE-HEP' },
    scholar: { icon: FaGraduationCap, label: 'scholar', name: 'Google Scholar' },
    semantic: { icon: SiSemanticscholar, label: 'semantic scholar', name: 'Semantic Scholar' },
    ads: { icon: SiNasa, label: 'ads', name: 'NASA ADS' },
    wos: { icon: SiClarivate, label: 'wos', name: 'Web of Science' },
}

/**
 * "A, B, and C", "A and B" or "A", with my own name set apart, and the names
 * listed in `links` (from the entry in ../_data/papers.ts) linked
 */
function Authors({
    names,
    me,
    links = {},
}: {
    names: string[]
    me: string
    links?: Record<string, string>
}) {
    return (
        <>
            {names.map((name, i) => (
                <span key={i}>
                    {i > 0 && (names.length > 2 ? ', ' : ' ')}
                    {i > 0 && i === names.length - 1 && 'and '}
                    {links[name] ? (
                        <a
                            href={links[name]}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline decoration-accent-muted/50 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent-muted"
                        >
                            {name}
                        </a>
                    ) : (
                        <span className={name === me ? 'text-foreground' : undefined}>{name}</span>
                    )}
                </span>
            ))}
        </>
    )
}

/**
 * One paper.
 *
 * @param paper the paper, from ../_lib/inspire.ts
 * @param me    my name, which is set apart in the author list
 */
export function PaperItem({ paper, me }: { paper: Paper; me: string }) {
    // Which panel is open under the chips: the abstract, the BibTeX, or neither
    const [open, setOpen] = useState<'abs' | 'bib' | null>(null)
    const [copied, setCopied] = useState(false)
    const toggle = (panel: 'abs' | 'bib') => setOpen(open === panel ? null : panel)
    const panelId = `paper-${paper.inspire}-panel`

    const copyBibtex = async () => {
        if (!paper.bibtex) return
        await navigator.clipboard.writeText(paper.bibtex)
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
    }

    return (
        <article className="text-xs sm:text-sm">
            <a
                href={`https://inspirehep.net/literature/${paper.inspire}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-accent hover:underline"
            >
                {paper.title}
            </a>
            <p className="mt-1 text-muted-foreground">
                <Authors names={paper.authors} me={me} links={paper.people} />
                {/* For a thesis: the supervisor and the university */}
                {paper.supervisors.length > 0 && (
                    <>
                        , supervised by{' '}
                        <Authors names={paper.supervisors} me={me} links={paper.people} />
                    </>
                )}
                {paper.institution && <> · {paper.institution}</>}
            </p>

            {/* The first row: the journal, the arXiv number, and the abstract and BibTeX */}
            <div className="mt-2 flex flex-wrap items-center gap-1.5">
                {paper.venue &&
                    (paper.venue.url ? (
                        <a
                            href={paper.venue.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(chip, paper.kind === 'thesis' ? thesis : journal)}
                        >
                            {paper.venue.label}
                        </a>
                    ) : (
                        <span className={cn(chip, paper.kind === 'thesis' ? thesis : journal)}>
                            {paper.venue.label}
                        </span>
                    ))}
                {paper.arxiv && (
                    <a
                        href={paper.arxiv.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(chip, arxiv)}
                    >
                        {paper.arxiv.label}
                    </a>
                )}

                {paper.abstractHtml && (
                    <button
                        type="button"
                        aria-expanded={open === 'abs'}
                        aria-controls={panelId}
                        onClick={() => toggle('abs')}
                        className={cn(chip, open === 'abs' ? active : quiet)}
                    >
                        abs
                    </button>
                )}
                {paper.bibtex && (
                    <button
                        type="button"
                        aria-expanded={open === 'bib'}
                        aria-controls={panelId}
                        onClick={() => toggle('bib')}
                        className={cn(chip, open === 'bib' ? active : quiet)}
                    >
                        bib
                    </button>
                )}
            </div>

            {/* The second row: the paper in the citation databases */}
            <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                {paper.links.map(({ site, url, count }) => {
                    const { icon: Icon, label, name } = sites[site]
                    return (
                        <a
                            key={site}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={count !== undefined ? `${name}: ${count} citations` : name}
                            aria-label={count !== undefined ? `${name}, ${count} citations` : name}
                            className={cn(chip, quiet)}
                        >
                            <Icon aria-hidden className="h-3 w-3" />
                            {/* The name is left out on phones, where the icon alone keeps
                                the row of chips short */}
                            <span className="hidden sm:inline">{label}</span>
                            {count !== undefined && count > 0 && (
                                <span className="tabular-nums text-foreground/70">{count}</span>
                            )}
                        </a>
                    )
                })}
            </div>

            {/* The open panel: the abstract, or the BibTeX with a copy button */}
            {open && (
                <div id={panelId} className="mt-3">
                    {open === 'abs' && paper.abstractHtml && (
                        <p
                            // The full width of the column in smaller type, justified
                            // (with words hyphenated where needed), so it forms a
                            // wide, low block
                            className="hyphens-auto border-l-2 border-accent-muted/40 pl-3 text-justify text-[11px] leading-relaxed text-muted-foreground sm:text-xs"
                            // The abstract is HTML made in ../_lib/inspire.ts from INSPIRE's
                            // text, with its characters escaped and its maths set by KaTeX
                            dangerouslySetInnerHTML={{ __html: paper.abstractHtml }}
                        />
                    )}
                    {open === 'bib' && paper.bibtex && (
                        <div className="relative">
                            <pre className="overflow-x-auto rounded-md border border-border bg-muted/30 p-3 pr-16 text-[0.6875rem] leading-relaxed">
                                {paper.bibtex}
                            </pre>
                            <button
                                type="button"
                                onClick={copyBibtex}
                                className={cn(chip, quiet, 'absolute right-2 top-2 bg-background')}
                            >
                                {copied ? 'copied' : 'copy'}
                            </button>
                        </div>
                    )}
                </div>
            )}
        </article>
    )
}
