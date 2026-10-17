"use client";

import BaseContainer from "@/components/layout/container/base-container";
import { StackVertical } from "@/components/layout/layout-stack/layout-stack";
import { HomepageFooter } from "@/components/layout/footer/HomepageFooter";
import { HeroSection } from "@/components/blocks/homepage/HeroSection";
import { CurrentWork } from "@/components/blocks/homepage/CurrentWork";
import { TerminalNav } from "@/components/ui/terminal-nav/terminal-nav";
import { HomepageSocials } from "@/components/blocks/homepage/HomepageSocials";

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
