// src/app/learning/refs/page.tsx
//
// The page at /learning/refs: physics references and reviews, written in
// content.mdx next to this file. Edit content.mdx to change the list.
"use client";

import Content from "./content.mdx";
import { mdxComponents } from "@/lib/mdx/mdx-components";
import BaseContainer from "@/components/layout/container/base-container";
import { StackVertical } from "@/components/layout/layout-stack/layout-stack";
import { TerminalNav } from "@/components/ui/terminal-nav/terminal-nav";
import { IndividualPageFooter } from "@/components/layout/footer/IndividualPageFooter";


/** Draws content.mdx with the site's Markdown styles, between the navigation and the footer. */
export default function References() {
	return (
		<BaseContainer size="md" paddingX="md" paddingY="lg">
			<StackVertical gap="md">
				<TerminalNav />
				{/* The text of the .mdx file; mdxComponents decides how each Markdown element looks.
				(The prose classes belong to Tailwind's typography plugin, which the site
				does not install, so they have no effect.) */}
				<div className="prose dark:prose-invert max-w-none">
					<Content components={mdxComponents} />
				</div>
			</StackVertical>

			<IndividualPageFooter
				parentPageName="Learning"
				showToTop={true}
			/>
		</BaseContainer>
	);
}
