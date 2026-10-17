// src/app/collaborations/_data/captions.ts
//
// The captions of the photos on the Collaborations page, like a _data file in
// Jekyll. Each entry pairs a file name in public/collabs/ with its caption, which
// is shown under the photo when it is enlarged. A photo without an entry has no
// caption. A link is written as in Markdown, [text](address), for example:
//
//     'anjan_da.jpg': 'With [Anjan da](https://inspirehep.net/...) at ICTS, Bangalore',
export const captions: Record<string, string> = {
    '1srijit.jpg':
        "With [the world's best supervisor](https://inspirehep.net/authors/1065349?ui-citation-summary=true) @ XX Convocation, IIIT Allahabad",
    '1sumanta.jpg':
        'With [Sumanta da](https://inspirehep.net/authors/1274784?ui-citation-summary=true) at RRI, Bangalore',
    'anjan_da.jpg':
        'With [Anjan da](https://inspirehep.net/authors/989342?ui-citation-summary=true) playing pool, IIT Madras',
    '2anjan_sunil.jpg':
        'With [Anjan da](https://inspirehep.net/authors/989342?ui-citation-summary=true) and [Sunil](https://inspirehep.net/authors/2661578?ui-citation-summary=true), Deoria Tal trip',
}
