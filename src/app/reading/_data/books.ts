// src/app/reading/_data/books.ts
//
// The books shown on the Reading page, in order, like a _data file in Jekyll. To
// add a book, put its cover in public/covers/ and add an entry below. Only the
// title, author and cover are needed; the other fields (see ../_types/book.ts)
// appear when the cover is clicked. An entry with every field looks like this:
//
//     {
//         title: 'Title: Subtitle',
//         author: 'Author Name',
//         cover: '/covers/file-name.jpg',
//         translator: 'Translator Name',
//         publisher: 'Publisher',
//         published: '2019',
//         pages: 320,
//         isbn: '9780000000000',
//         blurb: `The first paragraph of the description.
//
//             The second paragraph.`,
//         review: 'https://example.com/my-review',
//     },
//
// The blurb is written between backticks (`), so it can run over several lines
// and contain both kinds of quotation marks.
import { Book } from '../_types/book'

export const books: Book[] = [
    {
        title: 'Figuring',
        author: 'Maria Popova',
        cover: '/covers/popova.jpg',
        publisher: 'Pantheon',
        published: 'February 2019',
        pages: 592,
        isbn: '9781524748135',
        blurb: `Figuring explores the complexities of love and the human search for truth and
            meaning through the interconnected lives of several historical figures across four
            centuries—beginning with the astronomer Johannes Kepler, who discovered the laws of
            planetary motion, and ending with the marine biologist and author Rachel Carson, who
            catalyzed the environmental movement.

            Stretching between these figures is a cast of artists, writers, and
            scientists—mostly women, mostly queer—whose public contributions have risen out of
            their unclassifiable and often heartbreaking private relationships to change the way
            we understand, experience, and appreciate the universe. Among them are the
            astronomer Maria Mitchell, who paved the way for women in science; the sculptor
            Harriet Hosmer, who did the same in art; the journalist and literary critic Margaret
            Fuller, who sparked the feminist movement; and the poet Emily Dickinson.

            Emanating from these lives are larger questions about the measure of a good life
            and what it means to leave a lasting mark of betterment on an imperfect world: Are
            achievement and acclaim enough for happiness? Is genius? Is love? Weaving through
            the narrative is a set of peripheral figures—Ralph Waldo Emerson, Charles Darwin,
            Elizabeth Barrett Browning, Herman Melville, Frederick Douglass, Nathaniel
            Hawthorne, and Walt Whitman—and a tapestry of themes spanning music, feminism, the
            history of science, the rise and decline of religion, and how the intersection of
            astronomy, poetry, and Transcendentalist philosophy fomented the environmental
            movement.`,
        reviews: [
            {
                source: 'The New York Times',
                url: 'https://www.nytimes.com/2019/03/13/books/review/maria-popova-weaves-together-stories-of-human-ingenuity.html',
            },
            {
                source: 'The Guardian',
                url: 'https://www.theguardian.com/books/2020/feb/07/figuring-maria-popova-review',
            },
            {
                source: 'Los Angeles Review of Books',
                url: 'https://lareviewofbooks.org/article/the-mind-has-a-mind-of-its-own-on-maria-popovas-figuring/',
            },
            {
                source: 'Kirkus',
                url: 'https://www.kirkusreviews.com/book-reviews/maria-popova/figuring/',
            },
        ],
        openLibrary: 'https://openlibrary.org/books/OL27342998M',
    },
    {
        title: 'Pachinko',
        author: 'Min Jin Lee',
        cover: '/covers/pachinko.jpg',
        publisher: 'Head of Zeus',
        blurb: `In the early 1900s, teenaged Sunja, the adored daughter of a crippled
            fisherman, falls for a wealthy stranger at the seashore near her home in Korea. He
            promises her the world, but when she discovers she is pregnant—and that her lover is
            married—she refuses to be bought. Instead, she accepts an offer of marriage from a
            gentle, sickly minister passing through on his way to Japan. But her decision to
            abandon her home, and to reject her son's powerful father, sets off a dramatic saga
            that will echo down through the generations.

            Richly told and profoundly moving, Pachinko is a story of love, sacrifice,
            ambition, and loyalty. From bustling street markets to the halls of Japan's finest
            universities to the pachinko parlors of the criminal underworld, Lee's complex and
            passionate characters—strong, stubborn women, devoted sisters and sons, fathers
            shaken by moral crisis—survive and thrive against the indifferent arc of history.`,
        reviews: [
            {
                source: 'The New York Times',
                url: 'https://www.nytimes.com/2017/02/02/books/review/pachinko-min-jin-lee.html',
            },
            {
                source: 'The Guardian',
                url: 'https://www.theguardian.com/books/2017/mar/15/pachinko-min-jin-lee-review',
            },
            {
                source: 'The Irish Times',
                url: 'https://www.irishtimes.com/culture/books/pachinko-review-a-masterpiece-of-empathy-integrity-and-family-loyalty-1.3165406',
            },
            {
                source: 'NPR',
                url: 'https://www.npr.org/2017/02/07/512910187/culture-clash-survival-and-hope-in-pachinko',
            },
            {
                source: 'The Sydney Morning Herald',
                url: 'https://www.smh.com.au/entertainment/books/pachinko-review-min-jin-lees-saga-of-koreans-in-japan-is-hard-to-put-down-20170727-gxk6aw.html',
            },
            {
                source: 'Kirkus',
                url: 'https://www.kirkusreviews.com/book-reviews/min-jin-lee/pachinko/',
            },
        ],
        openLibrary: 'https://openlibrary.org/works/OL17762217W',
    },
    {
        title: 'Inspector Imanishi Investigates',
        author: 'Seicho Matsumoto',
        cover: '/covers/imanishi.jpg',
        translator: 'Beth Cary',
        publisher: 'Penguin Modern Classics',
        published: 'March 2025',
        pages: 352,
        isbn: '9780241724439',
        blurb: `Tokyo, 1960. As the first rays of morning light hit the rails at Kamata
            Station, a man's body is found on the tracks. With only two leads – a distinctive
            accent and a single word, 'kameda' – Senior Inspector Imanishi Eitaro is called in
            to solve the puzzle.

            Setting aside his beloved bonsai and haikus, he must cross Japan in search of
            answers, from Osaka to Akita, accompanied by junior detective Yoshimura. At each new
            town, they encounter traces of the avant-garde Nouveau Group – young Tokyo artists
            who are bringing new ideas from the West. What to make of this modern collective?
            And how to stop another mysterious death occurring? Inspector Imanishi
            investigates . . .

            A fascinating glimpse into Japanese society at a time of great change, this is one
            of Seicho Matsumoto's best-loved novels – a riveting mystery from the master of
            Japanese crime.`,
        reviews: [
            {
                source: 'Publishers Weekly',
                url: 'https://www.publishersweekly.com/9780939149285',
            },
        ],
        openLibrary: 'https://openlibrary.org/works/OL8681058W',
    },
    {
        title: "Aristotle: Understanding the World's Greatest Philosopher",
        author: 'John Sellars',
        cover: '/covers/aristotle.jpg',
        publisher: 'Pelican',
        published: 'February 2024',
        pages: 144,
        isbn: '9780241615645',
        blurb: `The Lyceum in Athens, now a ruin, has a claim to be the most significant place
            in human history. It is the site of Aristotle's school. Here the philosopher taught
            and discussed the answers to the deepest mysteries of the human condition, and
            changed the way we think.

            Today, it can be difficult to fully comprehend the staggering influence of
            Aristotle's lessons. Yet his observations about the world around him and his
            reflections on the nature of knowledge laid the foundations for all empirical
            science. His study of rational thought formed the basis of formal logic, the
            cornerstone of philosophical investigation. His examination of Greek city-states
            gave us political science, while his analysis of drama remains a mainstay of
            literature courses around the world.

            Acclaimed philosopher John Sellars takes us on a journey through Aristotle's
            thought, vividly bringing to life his key ideas, and demonstrating that the famous
            philosopher's capacity for curiosity continues to offer us all a vision of more
            fulfilled lives. The lessons of Aristotle, he shows, still have much to teach us
            today.`,
        openLibrary: 'https://openlibrary.org/works/OL28019798W',
    },
    {
        title: 'In a Flight of Starlings: The Wonders of Complex Systems',
        author: 'Giorgio Parisi',
        cover: '/covers/parisi.jpg',
        translator: 'Simon Carnell',
        publisher: 'Penguin Press',
        published: 'July 2023',
        pages: 144,
        isbn: '9780593493151',
        blurb: `With In a Flight of Starlings, celebrated physicist Giorgio Parisi guides us
            through his unorthodox yet exhilarating work, starting with investigating the
            principles of physics by observing the flight of flocks of birds. Studying the
            movements of these communities, he has realized, proves an illuminating way into
            understanding complex systems of all kinds—collections of everything from atoms
            and planets to other animals, such as ourselves.

            Along the way, he reflects on the lessons he has taken from a life in pursuit of
            scientific truth: the importance of serendipity to the discovery of new ideas, the
            surprising kinship between physics and other disciplines, and the value of science
            to a thriving society. In so doing, he removes the practice of science from the
            confines of the laboratory and brings it into the real world.

            Part elegant scientific treatise, part thrilling journey of discovery, In a Flight
            of Starlings is an invitation to find wonder in the world around us.`,
        reviews: [
            {
                source: 'Kirkus',
                url: 'https://www.kirkusreviews.com/book-reviews/giorgio-parisi/in-a-flight-of-starlings/',
            },
            {
                source: 'Publishers Weekly',
                url: 'https://www.publishersweekly.com/9780593493151',
            },
            {
                source: 'Prospect',
                url: 'https://www.prospectmagazine.co.uk/culture/62855/giorgio-parisi-starling-murmurations',
            },
            {
                source: 'The American Scholar',
                url: 'https://theamericanscholar.org/dont-forget-intuition/',
            },
            {
                source: 'The Guardian (interview)',
                url: 'https://www.theguardian.com/science/2023/jun/25/giorgio-parisi-nobel-prize-physics-spin-glasses-complex-systems-in-a-flight-of-starlings',
            },
            {
                source: 'Sayani Sarkar',
                url: 'https://sayanisarkar.substack.com/p/in-a-flight-of-starlings-by-giorgio',
            },
        ],
        openLibrary: 'https://openlibrary.org/books/OL39783986M',
    },
    {
        title: "The Sense of Style: The Thinking Person's Guide to Writing in the 21st Century",
        author: 'Steven Pinker',
        cover: '/covers/sos.jpg',
        publisher: 'Penguin',
        published: 'September 2015',
        pages: 368,
        isbn: '9780241957714',
        blurb: `What is the secret of good prose? Does writing well even matter in an age of
            instant communication? Should we care? In this funny, thoughtful book about the
            modern art of writing, Steven Pinker shows us why we all need a sense of style.

            More than ever before, the currency of our social and cultural lives is the
            written word, from Twitter and texting to blogs, e-readers and old-fashioned
            books. But most style guides fail to prepare people for the challenges of writing
            in the 21st century, portraying it as a minefield of grievous errors rather than a
            form of pleasurable mastery. They fail to deal with an inescapable fact about
            language: it changes over time, adapted by millions of writers and speakers to
            their needs. Confusing changes in the world with moral decline, every generation
            believes the kids today are degrading society and taking language with it. A guide
            for the new millennium, writes Steven Pinker, has to be different.

            Drawing on the latest research in linguistics and cognitive science, Steven Pinker
            replaces the recycled dogma of previous style guides with reason and evidence.
            This thinking person's guide to good writing shows why style still matters: in
            communicating effectively, in enhancing the spread of ideas, in earning a reader's
            trust and, not least, in adding beauty to the world. Eye-opening, mind-expanding
            and cheerful, The Sense of Style shows that good style is part of what it means
            to be human.`,
        reviews: [
            {
                source: 'The New York Times',
                url: 'https://www.nytimes.com/2014/10/19/books/review/steven-pinker-the-sense-of-style-review.html',
            },
            {
                source: 'The Guardian',
                url: 'https://www.theguardian.com/books/2014/sep/15/sense-of-style-review-steven-pinker-linguistics',
            },
            {
                source: 'The Washington Post',
                url: 'https://www.washingtonpost.com/entertainment/books/can-something-be-totally-unique-steven-pinkers-new-book-says-yes/2014/11/06/294a8d8c-5e10-11e4-91f7-5d89b5e8c251_story.html',
            },
            {
                source: 'The Telegraph',
                url: 'https://www.telegraph.co.uk/culture/books/bookreviews/11089729/The-Sense-of-Style-by-Steven-Pinker-review-waffle-and-bilge.html',
            },
            {
                source: 'Times Higher Education',
                url: 'https://www.timeshighereducation.com/books/the-sense-of-style-the-thinking-persons-guide-to-writing-in-the-21st-century-by-steven-pinker/2016276.article',
            },
            {
                source: 'Kirkus',
                url: 'https://www.kirkusreviews.com/book-reviews/steven-pinker/the-sense-of-style/',
            },
        ],
        openLibrary: 'https://openlibrary.org/books/OL28206534M',
    },
]
