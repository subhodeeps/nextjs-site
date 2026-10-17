// src/components/blocks/homepage/CurrentWork.tsx
//
// The "Updates" list on the home page. To add an update, add an entry at the top
// of the `items` list in CurrentWork below; move old ones to the Older Updates
// page (src/app/older_updates/page.tsx).
import { motion } from "framer-motion";
// Icons from the lucide-react package, drawn as <Briefcase className="w-4 h-4" />
import {
  Briefcase,
  Box,
  History,
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

/**
 * One update: an icon, then the text, sliding in after `delay` seconds.
 *
 * @param icon          the icon to show on the left
 * @param text          the update itself: plain text, or a link written as <a>
 * @param hyperlink     optional address of a link added after the text, with
 * @param hyperlinkText its text, and
 * @param endText       optional text after the link. (The items below put their
 *                      links inside `text` instead, so these three are unused.)
 */
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
      <div className="text-accent-muted">{icon}</div>
      <Text variant="muted" size="sm">
        {text}
        {hyperlink && hyperlinkText && (
          <Link href={hyperlink} className="text-accent hover:underline">
            {hyperlinkText}
          </Link>
        )}
        {endText && <span>{endText}</span>}
      </Text>
    </motion.div>
  );
}

/**
 * The Updates section. `items` is the list of updates, newest first, like a
 * _data file inside the component: each entry has an icon and a text, which is
 * either a plain string or a link.
 */
export function CurrentWork() {
  const items = [

     {
      icon: <Briefcase className="w-4 h-4" aria-hidden="true" />,
      text: "[01 Jun 2026] Joined IIT GN as a postdoc.",
    },


    {
      icon: <BookOpen className="w-4 h-4" aria-hidden="true" />,
      text: (
        <a
          href="https://arxiv.org/abs/2605.28951"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline"
        >
          [29 May 2026] The Vaidya QNM preprint is out!
        </a>
      ),
    },

    {
  icon: <Box className="w-4 h-4" aria-hidden="true" />,
  text: (
    <a
      href="https://sites.google.com/site/nsm2015iiserm/home/schedule?authuser=0"
      target="_blank"
      rel="noopener noreferrer"
      className="text-accent hover:underline"
    >
      [11 Mar 2026] Talk at FRoG 26, IISER Mohali.
    </a>
  ),
},


    {
      icon: <BookOpen className="w-4 h-4" aria-hidden="true" />,
      text: (
        <a
          href="https://arxiv.org/abs/2511.14841"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline"
        >
          [20 Nov 2025] Vitor's ICTS lecture notes are out!
        </a>
      ),
    },

    {
      icon: <Box className="w-4 h-4" aria-hidden="true" />,
      text: "[05 Mar 2025] Talk at CMI.",
    },

    {
      icon: <Box className="w-4 h-4" aria-hidden="true" />,
      text: "[25 Feb 2025] Talk at SINP.",
    },

    {
      icon: <History className="w-4 h-4" aria-hidden="true" />,
      text: (
        <a
          href="/older_updates"
          rel="noopener noreferrer"
          className="text-accent hover:underline"
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
          {/* One WorkItem per entry; each appears 0.1 s after the one above it */}
          {items.map((item, index) => (
            <WorkItem
              key={index}
              icon={item.icon}
              text={item.text}
              delay={1.2 + index * 0.1}
            />
          ))}
        </StackVertical>
      </StackVertical>
    </motion.div>
  );
}
