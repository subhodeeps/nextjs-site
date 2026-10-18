// src/components/blocks/algorithm-block/algorithm-block.tsx
//
// An algorithm in a post, written as a fenced block whose language is
// "algorithm", and drawn like the algorithm environment of LaTeX, on a tinted
// card like that of a code block: the caption above a rule, the input and output, and numbered lines in which keywords
// such as `for` and `return` are set in bold and $...$ is typeset as mathematics.
//
//   ```algorithm
//   Algorithm 1: Euler's method
//   Input: $f$, $y_0$, the step $h$
//   for $n = 0$ to $N - 1$ do
//       $y_{n+1} \gets y_n + h f(y_n)$  // one step
//   end for
//   return $y_N$
//   ```
//
// Indentation is kept, and text after // is shown as a comment. The block is
// drawn when the site is built, so KaTeX typesets its mathematics then, as it
// does for $...$ in the text of a post.
import katex from 'katex'
import { Fragment } from 'react'
import { cn } from '@/lib/utils/utils'
import { monoFont } from '@/styles/fonts/fonts'

// Words set in bold, as in LaTeX's algorithmic package
const keywords =
    /\b(for|each|in|to|do|while|repeat|until|if|then|else|end|return|function|procedure|break|continue)\b/

// Lines that start with one of these are shown, unnumbered, above the others
const heading = /^(Input|Output|Require|Ensure|Data|Result):\s*/

/** Text with each $...$ typeset by KaTeX and, if `bold`, its keywords in bold */
function Text({ text, bold = false }: { text: string; bold?: boolean }) {
    // Splitting at $...$ puts the mathematics at the odd positions, and splitting
    // at the keywords puts the keywords there
    return (
        <>
            {text.split(/\$([^$]+)\$/).map((part, i) =>
                i % 2 === 1 ? (
                    <span
                        key={i}
                        dangerouslySetInnerHTML={{
                            __html: katex.renderToString(part, { throwOnError: false }),
                        }}
                    />
                ) : (
                    <Fragment key={i}>
                        {bold
                            ? part.split(keywords).map((word, j) =>
                                  j % 2 === 1 ? (
                                      <strong key={j} className="font-semibold text-accent">
                                          {word}
                                      </strong>
                                  ) : (
                                      word
                                  ),
                              )
                            : part}
                    </Fragment>
                ),
            )}
        </>
    )
}

/**
 * The algorithm.
 *
 * @param source the text of the fenced block
 */
export default function AlgorithmBlock({ source }: { source: string }) {
    const lines = source.replace(/\s+$/, '').split('\n')

    // "Algorithm 1: Euler's method" on the first line is the caption
    const caption = /^(Algorithm[^:]*):\s*(.*)$/.exec(lines[0] ?? '')
    const body = caption ? lines.slice(1) : lines

    let number = 0
    return (
        <figure
            className={cn(
                monoFont.className,
                'my-8 rounded-lg border border-border bg-muted/50 px-4',
                'text-[11px] sm:text-[13px] leading-relaxed text-foreground',
            )}
        >
            {caption && (
                <figcaption className="border-b border-foreground/20 py-2">
                    <strong className="font-semibold">{caption[1]}:</strong>{' '}
                    <Text text={caption[2]} />
                </figcaption>
            )}

            <div className="grid grid-cols-[auto_1fr] gap-x-4 py-3">
                {body.map((line, i) => {
                    if (!line.trim()) return null

                    // Input:, Output: and the like, unnumbered, across both columns
                    const head = heading.exec(line)
                    if (head) {
                        return (
                            <div key={i} className="col-span-2">
                                <strong className="font-semibold">{head[1]}:</strong>{' '}
                                <Text text={line.slice(head[0].length)} />
                            </div>
                        )
                    }

                    // A numbered line, indented by its leading spaces, with any
                    // comment after // in grey
                    const indent = line.length - line.trimStart().length
                    const [code, ...comment] = line.trim().split('//')
                    number += 1
                    return (
                        <Fragment key={i}>
                            <span className="select-none text-right text-muted-foreground">
                                {number}
                            </span>
                            <span style={{ paddingLeft: `${indent / 2}em` }}>
                                <Text text={code.trimEnd()} bold />
                                {comment.length > 0 && (
                                    <span className="text-muted-foreground">
                                        {'  ▷ '}
                                        <Text text={comment.join('//').trim()} />
                                    </span>
                                )}
                            </span>
                        </Fragment>
                    )
                })}
            </div>
        </figure>
    )
}
