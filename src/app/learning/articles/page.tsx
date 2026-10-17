"use client";

import Content from "./content.mdx";
import { mdxComponents } from "@/lib/mdx/mdx-components";
import BaseContainer from "@/components/layout/container/base-container";
import { StackVertical } from "@/components/layout/layout-stack/layout-stack";
import { TerminalNav } from "@/components/ui/terminal-nav/terminal-nav";
import { IndividualPageFooter } from "@/components/layout/footer/IndividualPageFooter";


export default function References() {
	return (
		<BaseContainer size="md" paddingX="md" paddingY="lg">
			<StackVertical gap="md">
				<TerminalNav />
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
