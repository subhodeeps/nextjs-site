// src/app/collaborations/grid.tsx
//
// The photo grid on the Collaborations page, and the enlarged view that opens
// when a photo is clicked. It runs in the browser ('use client' below), because
// it shuffles the photos on each visit and reacts to clicks and the Esc key.
'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

type CollaboratorPhoto = {
    id: string
    name: string
    photoUrl: string
    width: number
    height: number
}

/**
 * Returns a copy of the list in random order (the Fisher-Yates shuffle). The <T>
 * means it works for a list of anything, and returns a list of the same kind.
 */
function shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
}

/**
 * The photo grid.
 *
 * @param initialPeople the photos, in folder order, from page.tsx
 *
 * Three values are kept with useState: the photos in their current order,
 * whether the shuffle has happened (the grid stays invisible until then, so the
 * unshuffled order never flashes up), and the photo shown enlarged, if any.
 */
export default function CollaboratorGrid({
    initialPeople,
}: {
    initialPeople: CollaboratorPhoto[]
}) {
    const [people, setPeople] = useState<CollaboratorPhoto[]>(initialPeople)
    const [isMounted, setIsMounted] = useState(false)
    const [selectedImage, setSelectedImage] = useState<CollaboratorPhoto | null>(null)

    // Shuffle instantly on load
    useEffect(() => {
        setPeople(shuffleArray(initialPeople))
        setIsMounted(true)
    }, [initialPeople])

    // Allow closing the magnified image with the Escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setSelectedImage(null)
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [])

    // Lock body scroll when image is magnified
    useEffect(() => {
        if (selectedImage) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [selectedImage])

    return (
        <>
            {/* The Masonry Grid: CSS columns (one, two from sm:, three from lg:), with
                the photos flowing down each column, so photos of different heights
                pack together. Clicking a photo enlarges it. */}
            <div
                // className={`columns-1 sm:columns-2 gap-8 w-full transition-opacity duration-500 ${isMounted ? 'opacity-100' : 'opacity-0'}`}
                className={`columns-1 sm:columns-2 lg:columns-3 gap-6 w-full transition-opacity duration-500 ${isMounted ? 'opacity-100' : 'opacity-0'}`}
            >
                {people.map((person) => (
                    // Swapped from a standard div to a motion.div to enable the layout transition
                    <motion.div
                        key={person.id}
                        layoutId={`photo-container-${person.id}`}
                        onClick={() => setSelectedImage(person)}
                        className="
              break-inside-avoid
              w-full
              mb-8
              relative
              group
              overflow-hidden
              rounded-2xl
              shadow-sm
              hover:shadow-md
              transition-shadow
              duration-300
              cursor-pointer
            "
                    >
                        <Image
                            src={person.photoUrl}
                            alt={person.name}
                            width={person.width}
                            height={person.height}
                            sizes="(max-width:640px) 100vw, 50vw"
                            className="
                w-full
                h-auto
                block
                object-cover
                rounded-2xl
                transition-transform
                duration-300
                group-hover:scale-[1.015]
              "
                        />
                    </motion.div>
                ))}
            </div>

            {/* The Fullscreen Magnification Overlay. AnimatePresence lets it animate out
                when it closes, and the shared layoutId makes the photo grow from its
                place in the grid. Clicking anywhere, or pressing Esc, closes it. */}
            <AnimatePresence>
                {selectedImage && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12">
                        {/* The blurred background backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedImage(null)}
                            className="absolute inset-0 bg-background/80 backdrop-blur-md cursor-pointer"
                        />

                        {/* The magnified image */}
                        <motion.div
                            layoutId={`photo-container-${selectedImage.id}`}
                            className="relative z-10 w-full max-w-5xl flex items-center justify-center rounded-xl md:rounded-2xl overflow-hidden shadow-2xl cursor-pointer"
                            onClick={() => setSelectedImage(null)}
                        >
                            <Image
                                src={selectedImage.photoUrl}
                                alt={selectedImage.name}
                                width={selectedImage.width}
                                height={selectedImage.height}
                                // Unoptimized ensures the raw image loads for maximum quality when fullscreen
                                unoptimized
                                className="w-auto h-auto max-w-full max-h-[85vh] object-contain rounded-xl md:rounded-2xl"
                            />
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    )
}
