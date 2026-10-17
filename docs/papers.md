# Research page: papers, preprints, and the thesis

The papers on the Research page are listed in
`src/app/research/_data/papers.ts` by their INSPIRE-HEP record numbers. The
title, authors, journal, arXiv number, abstract, BibTeX entry, and citation
count of each paper are fetched from INSPIRE-HEP when the site is built, so
nothing else needs to be written by hand.

## Adding a paper

1. Find the paper on <https://inspirehep.net>. Its record number is the last
   part of its address; for `https://inspirehep.net/literature/2735894`, it is
   `2735894`.
2. Add a line at the top of the `papers` list in `papers.ts` (the list is
   newest first):

   ```ts
   export const papers: PaperEntry[] = [
       { inspire: '1234567' },
       { inspire: '3162425' },
       // ...
   ]
   ```

3. Preview the Research page. In `npm run dev`, the details are fetched the
   first time the page is opened, which takes a few seconds.

## Preprints and published papers

A paper that INSPIRE-HEP lists without a journal is shown under Preprints. Once
INSPIRE-HEP records the journal, the paper moves to Published Papers at the
next rebuild of the site, without any change to the file.

## What the chips mean

- **Journal** (blue): the journal reference, linked to the paper's DOI.
- **arXiv** (red): the arXiv number, linked to the arXiv page. Preprints also
  show the subject category, such as `[gr-qc]`.
- **abs** and **bib**: open the abstract or the BibTeX entry under the paper;
  the BibTeX has a copy button.
- **inspire**, **scholar**, **semantic scholar**, **ads**: the paper on
  INSPIRE-HEP (with its citation count), Google Scholar, Semantic Scholar, and
  NASA ADS. On phones these show only their icons.

## Optional fields

- **Web of Science.** Web of Science links cannot be derived from a paper's
  identifiers, so its chip appears only when the paper's address on Web of
  Science is given:

  ```ts
  { inspire: '2735894', wos: 'https://www.webofscience.com/wos/...' },
  ```

- **Links on people's names.** A name can be linked in one paper's author list
  by giving the name as INSPIRE-HEP writes it ("First Last") and the address:

  ```ts
  {
      inspire: '3162653',
      people: { 'Srijit Bhattacharjee': 'https://profile.iiita.ac.in/srijit/' },
  },
  ```

## The thesis

The thesis is the `thesis` entry in the same file, shown in a section of its
own after the papers. It takes the same fields as a paper. INSPIRE-HEP lists
the supervisor among the authors; the page names the supervisor after
"supervised by".

## Correcting a paper's details

Since the details come from INSPIRE-HEP, a wrong title, author list, or journal
is best corrected on INSPIRE-HEP itself, which accepts corrections from authors
(its help pages explain how). The site picks up the correction at its next
rebuild.

## Citation counts

The counts are fetched at every build, and the site is rebuilt every day, so
they are at most a day old. See [The daily rebuild](daily-rebuild.md).

## If the build fails

The build depends on INSPIRE-HEP. If INSPIRE-HEP cannot be reached, or a record
number does not exist, the build stops with an error that names the address it
could not fetch, and the site already online stays as it is. Check the record
number, or wait and push again (or run the daily rebuild by hand) once
INSPIRE-HEP is back.
