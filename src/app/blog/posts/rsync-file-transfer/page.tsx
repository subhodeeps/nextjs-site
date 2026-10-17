// src/app/blog/posts/rsync-file-transfer/page.tsx
//
// How this post is laid out: the navigation, the date line, the text from
// content.mdx, and the footer. The text itself is in content.mdx, next to this
// file. Readers reach the post at /blog/rsync-file-transfer (see src/app/blog/[slug]/page.tsx).
"use client";

// The post text: importing an .mdx file gives a component that draws it
import Content from "./content.mdx";
import { mdxComponents } from "@/lib/mdx/mdx-components";
import BaseContainer from "@/components/layout/container/base-container";
import { StackVertical } from "@/components/layout/layout-stack/layout-stack";
import { TerminalNav } from "@/components/ui/terminal-nav/terminal-nav";
import { IndividualPageFooter } from "@/components/layout/footer/IndividualPageFooter";
import Text from "@/components/ui/text/text";
import { SECTION_IDS } from "./section-ids";

import { cn } from "@/lib/utils/utils";
import { monoFont } from "@/styles/fonts/fonts";

/**
 * The post page. The date and reading time on the first line are written here by
 * hand; keep them in step with the frontmatter of content.mdx.
 */
export default function BlogPostPage() {
    return (
        <BaseContainer size="md" paddingX="md" paddingY="lg">
            <StackVertical gap="md">
                <TerminalNav />

                {/* SECTION_IDS?.ARTICLE_CONTENT reads the id if SECTION_IDS exists; || "content" is the fallback */}
                <article id={SECTION_IDS?.ARTICLE_CONTENT || "content"}>
                    <Text variant="muted" size="xs" className="mb-8">June 23, 2026 | 5 min read</Text>

                    {/* The post text; mdxComponents decides how each Markdown element looks */}
                    <div className={cn("max-w-none", monoFont.className)}>
                        <Content components={mdxComponents} />
                    </div>
                </article>
            </StackVertical>

            <IndividualPageFooter
                sectionName="Blog"
                showToTop={true}
            />
        </BaseContainer>
    );
}