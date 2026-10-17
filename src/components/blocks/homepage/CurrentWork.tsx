// src/components/blocks/homepage/CurrentWork.tsx
//
// The "Updates" section of the home page: the newest updates from
// src/content/updates.md, followed by a link to the Older Updates page when there
// are more. To add an update, add a line at the top of the list in updates.md.
import { motion } from 'framer-motion'
import { History, Newspaper } from 'lucide-react'
import SectionHeading from '@/components/ui/text-heading/section-heading'
import { UpdateList } from '@/components/blocks/updates/UpdateList'
import type { Update } from '@/lib/updates/updates'

/**
 * The Updates section, which fades in a second after the page opens; its lines
 * then slide in one after another.
 *
 * @param updates  the newest updates, from src/lib/updates/updates.ts
 * @param hasOlder whether to end with a link to the Older Updates page
 */
export function CurrentWork({ updates, hasOlder }: { updates: Update[]; hasOlder: boolean }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
        >
            <SectionHeading icon={Newspaper}>Updates</SectionHeading>
            <UpdateList
                updates={updates}
                startDelay={1.2}
                footer={
                    hasOlder
                        ? { icon: History, text: '[OLDER UPDATES]', href: '/older_updates' }
                        : undefined
                }
            />
        </motion.div>
    )
}
