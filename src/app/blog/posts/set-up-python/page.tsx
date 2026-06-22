"use client";

import Content from "./content.mdx";
import { mdxComponents } from "@/lib/mdx/mdx-components";
import BaseContainer from "@/components/layout/container/base-container";
import { StackVertical } from "@/components/layout/layout-stack/layout-stack";
import { DynamicBreadcrumb } from "@/components/ui/primitives/breadcrumb";
import { ThemeToggle } from "@/components/ui/theme/theme-toggle";
import { IndividualPageFooter } from "@/components/layout/footer/IndividualPageFooter";
import Text from "@/components/ui/text/text";
import { SECTION_IDS } from "./section-ids";

// 1. Added these two imports
import { cn } from "@/lib/utils/utils";
import { monoFont } from "@/styles/fonts/fonts";

export default function BlogPostPage() {
    return (
        <BaseContainer size="md" paddingX="md" paddingY="lg">
            <StackVertical gap="md">
                <div className="flex items-center justify-between">
                    <DynamicBreadcrumb
                        items={[
                            { href: "/", label: "Home", emoji: "👾" },
                            { href: "/blog", label: "Blog" },
                            { label: "Blog Post" }, 
                        ]}
                    />
                    <ThemeToggle />
                </div>

                <article id={SECTION_IDS?.ARTICLE_CONTENT || "content"}>
                    <Text variant="muted" size="xs" className="mb-8">June 23, 2026 | 5 min read</Text>

                    {/* 2. Swapped 'prose' for your custom monospace font */}
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