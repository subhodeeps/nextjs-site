// src/app/blog/_components/BlogCard.tsx
//
// One entry in the blog index: the post's title, description, date and reading
// time, all linking to the post.
import Link from "next/link"
import { cn } from "@/lib/utils/utils"
import { StackVertical, StackHorizontal } from "@/components/layout/layout-stack/layout-stack"
import Text from "@/components/ui/text/text"
import TextHeading from "@/components/ui/text-heading/text-heading"
import { BlogPost } from "../_types/blog"

/**
 * A post's entry in the blog index.
 *
 * @param post   the post, with the fields listed in ../_types/blog.ts
 * @param isLast true for the last post, which gets no dividing line below it
 *
 * The outer element has the class "group", so classes inside it written
 * group-hover:... apply when the mouse is anywhere over the card.
 */
export function BlogCard({ post, isLast }: { post: BlogPost; isLast?: boolean }) {
    return (
        <div className="group">
            <Link 
                href={`/blog/${post.slug}`} 
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
                                {post.date}
                            </Text>
                            <Text variant="muted" size="xs">•</Text>
                            <Text variant="muted" size="xs">
                                {post.readingTime}
                            </Text>
                        </StackHorizontal>
                    </StackVertical>
                </article>
            </Link>
            {/* Separator line with reduced top margin */}
            {!isLast && (
                <hr className="border-border mt-3" />
            )}
        </div>
    )
} 