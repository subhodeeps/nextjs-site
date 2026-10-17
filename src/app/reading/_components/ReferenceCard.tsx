// src/app/reading/_components/ReferenceCard.tsx
//
// A card linking to a subpage: a title, a description and the date it was last
// updated.
// Not used at the moment: the Reading page links to its subpages within its text.
import Link from "next/link"
import { cn } from "@/lib/utils/utils"
import { StackVertical, StackHorizontal } from "@/components/layout/layout-stack/layout-stack"
import Text from "@/components/ui/text/text"
import TextHeading from "@/components/ui/text-heading/text-heading"
import { NotesTypes } from "../_types/note-types"

/**
 * A card for one entry of ../_data/posts.ts.
 *
 * @param post   the entry; an href starting with http opens in a new tab
 * @param isLast true for the last card, which gets no dividing line below it
 */
export function ReferenceCard({ post, isLast }: { post: NotesTypes; isLast?: boolean }) {
    const isExternalLink = post.href.startsWith('http')
    
    return (
        <div className="group">
            <Link 
                href={post.href}
                target={isExternalLink ? "_blank" : undefined}
                className={cn(
                    "block py-3",
                    "transition-all duration-300",
                    "hover:translate-x-1"
                )}
            >
                <article>
                    <StackVertical gap="xs">
                        <TextHeading 
                            as="h4" 
                            weight="medium" 
                            className={cn(
                                "group-hover:text-accent transition-colors duration-300"
                            )}
                        >
                            {post.title}
                        </TextHeading>
                        <Text 
                            variant="muted"
                            size="sm"
                            className="line-clamp-2"
                        >
                            {post.description}
                        </Text>
                        <StackHorizontal className="text-muted-foreground" gap="xs">
                            <Text variant="muted" size="xs">
                                Last Updated: {post.lastUpdated}
                            </Text>
                        </StackHorizontal>
                    </StackVertical>
                </article>
            </Link>
            {!isLast && (
                <hr className="border-border mt-3" />
            )}
        </div>
    )
} 