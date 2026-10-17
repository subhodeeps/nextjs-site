// src/components/blocks/homepage/Homepage.tsx
//
// The whole home page, put together from its sections. src/app/page.tsx shows
// it at /. To change the text of the home page, edit HeroSection.tsx (the intro
// and photo), CurrentWork.tsx (the updates) or HomepageSocials.tsx.
"use client";

import BaseContainer from "@/components/layout/container/base-container";
import { StackVertical } from "@/components/layout/layout-stack/layout-stack";
import { HomepageFooter } from "@/components/layout/footer/HomepageFooter";
import { HeroSection } from "@/components/blocks/homepage/HeroSection";
import { CurrentWork } from "@/components/blocks/homepage/CurrentWork";
import { TerminalNav } from "@/components/ui/terminal-nav/terminal-nav";
import { HomepageSocials } from "@/components/blocks/homepage/HomepageSocials";

/**
 * The home page: the navigation prompt, then the intro, the updates and the
 * socials, then the footer. <>...</> groups elements without adding a wrapper.
 */
export function Homepage() {
  return (
    <>
      <BaseContainer size="md" paddingX="md" paddingY="lg">
        <TerminalNav className="mb-8" />
        <StackVertical gap="lg">
          <HeroSection />
          <CurrentWork />
          <HomepageSocials />
        </StackVertical>
      </BaseContainer>
      <HomepageFooter />
    </>
  );
}
