import { motion } from "framer-motion";
import {
  Code,
  Briefcase,
  Shield,
  SquarePi,
  Brain,
  Box,
  Snowflake,
  Divide,
  Rotate3D,
  History,
  BrainIcon,
  Apple,
  GraduationCap,
  BookOpen,
} from "lucide-react";
import { StackVertical } from "@/components/layout/layout-stack/layout-stack";
import Text from "@/components/ui/text/text";
import TextHeading from "@/components/ui/text-heading/text-heading";
import Link from "next/link";

interface WorkItemProps {
  icon: React.ReactNode;
  text: React.ReactNode;
  delay: number;
  hyperlink?: string;
  hyperlinkText?: string;
  endText?: string;
}

function WorkItem({
  icon,
  text,
  delay,
  hyperlink,
  hyperlinkText,
  endText,
}: WorkItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="flex items-center gap-3"
    >
      <div className="text-purple-500">{icon}</div>
      <Text variant="muted" size="sm">
        {text}
        {hyperlink && hyperlinkText && (
          <Link href={hyperlink} className="text-purple-500 hover:underline">
            {hyperlinkText}
          </Link>
        )}
        {endText && <span>{endText}</span>}
      </Text>
    </motion.div>
  );
}

export function CurrentWork() {
  const items = [
    {
      icon: <Box className="w-4 h-4" />,
      text: "[25 Feb 2025] Talk at SINP.",
    },

    {
      icon: <Apple className="w-4 h-4" />,
      text: (
        <a
          href="https://nar.iiita.ac.in/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple-500 hover:underline"
        >
          [07 -- 09 MAR 2025] Workshop on Numerical and Analytical Relativity @
          IIITA.
        </a>
      ),
    },

    {
      icon: <Apple className="w-4 h-4" />,
      text: (
        <a
          href="https://physics.iitm.ac.in/~csgc/events/sbhgw2024"
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple-500 hover:underline"
        >
          [10 -- 14 FEB 2025] Second School on Black Holes and Gravitational
          Waves @ IITM.
        </a>
      ),
    },

    {
      icon: <Brain className="w-4 h-4" />,
      text: "[04 Nov 2024] Successfully defended my Ph.D. thesis at IIIT Allahabad.",
    },

    {
      icon: <BookOpen className="w-4 h-4" />,
      text: (
        <a
          href="https://doi.org/10.1103/PhysRevD.109.104021"
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple-500 hover:underline"
        >
          [07 May 2024] Published in PRD: Gravitational atoms in the braneworld
          scenario.
        </a>
      ),
    },

    {
      icon: <Briefcase className="w-4 h-4" />,
      text: "[01 Apr 2024] Joined the CSGC-IITM as a postdoctoral fellow.",
    },

    {
      icon: <History className="w-4 h-4" />,
      text: (
        <a
          href="/older_updates"
          rel="noopener noreferrer"
          className="text-purple-500 hover:underline"
        >
          [OLDER UPDATES]
        </a>
      ),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
    >
      <StackVertical gap="none">
        <TextHeading as="h2">Updates</TextHeading>
        <StackVertical gap="md">
          {items.map((item, index) => (
            <WorkItem
              key={index}
              icon={item.icon}
              text={item.text}
              delay={1.2 + index * 0.1}
              // hyperlink={item.hyperlink}
              // hyperlinkText={item.hyperlinkText}
              // endText={item.endText}
            />
          ))}
        </StackVertical>
      </StackVertical>
    </motion.div>
  );
}
