// src/app/research/_data/papers.ts
//
// The papers on the Research page, like a _data file in Jekyll. Each paper needs
// only its INSPIRE-HEP record number, the number at the end of its INSPIRE
// address (https://inspirehep.net/literature/2735894). The title, authors,
// journal, abstract, BibTeX and citation count are fetched from INSPIRE when the
// site is built (see ../_lib/inspire.ts), so they stay up to date by themselves.
//
// To add a paper, add a line at the top of `papers` (newest first). A paper that
// INSPIRE lists without a journal is shown under Preprints, and moves to Published
// Papers by itself once INSPIRE records the journal.
//
// Web of Science has no public link that can be worked out from a paper's details,
// so its chip appears only when the paper's Web of Science address is given:
//
//     { inspire: '2735894', wos: 'https://www.webofscience.com/wos/woscc/full-record/WOS:...' },

/** One entry: the INSPIRE record number, and optionally the Web of Science address */
export type PaperEntry = {
    inspire: string
    wos?: string
}

export const papers: PaperEntry[] = [
    { inspire: '3162425' },
    { inspire: '3084799' },
    { inspire: '2735894' },
    { inspire: '2651487' },
    { inspire: '1940051' },
    { inspire: '1830603' },
    { inspire: '1797104' },
]

// The PhD thesis, shown in a section of its own after the papers
export const thesis: PaperEntry = { inspire: '3162653' }

// My name as INSPIRE writes it ("First Last"); it is set apart in the author lists
export const me = 'Subhodeep Sarkar'
