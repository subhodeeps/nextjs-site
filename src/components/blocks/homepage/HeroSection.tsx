'use client'

import { motion } from 'framer-motion'
import { monoFont } from '@/styles/fonts/fonts'
import { cn } from '@/lib/utils/utils'
import TextHeading from '@/components/ui/text-heading/text-heading'
import Text from '@/components/ui/text/text'
import { StackVertical } from '@/components/layout/layout-stack/layout-stack'
import Link from 'next/link'
import Image from 'next/image'
import Ruler from '@/components/ui/ruler/ruler'
import { List, ListItem } from '@/components/ui/list/list'

export function HeroSection() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative pb-8"
        >
            <div className="relative">
                <StackVertical gap="xs">
                    <motion.div
                        animate={{ 
                            y: [0, -10, 0],
                        }}
                        transition={{ 
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className={cn("text-2xl sm:text-3xl md:text-4xl", monoFont.className)}
                    >
                        👾
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="relative"
                    >
                        <TextHeading as="h1" className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                            subhodeep's homepage
                        </TextHeading>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <Text >
                            Hey, how are you! I am 
                            {' '}
                                    <Link href="/about" className="text-purple-500 font-bold hover:underline">
                                        Subhodeep
                                    </Link>.
                        </Text>

                        <Ruler color='colorless' marginTop='lg' marginBottom='none'/>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            <Text>
                                I am a postdoctoral researcher at IIT Madras, India. I love gravity, programming, books, and biryani. Welcome to my corner of the internet! :3
                            </Text>
                          
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                        >       
                                <Ruler color='colorless' marginTop='lg' marginBottom='none'/>

                                <Text>
                                    I am interested in various aspects of black holes in general relativity and beyond. To know more about my work, please check out my{' '}
                                    <Link href="/research" className="text-purple-500 font-bold hover:underline">
                                        publications
                                    </Link>
                                    . 
                                </Text>

                                <Ruler color='colorless' marginTop='lg' marginBottom='none'/>

                                <Text>
                                   You can find my complete CV  {' '}
                                    <Link href="/cv" className="text-purple-500 font-bold hover:underline">
                                        here
                                    </Link>
                                    .
                                </Text>

                                <Ruler color='colorless' marginTop='lg' marginBottom='none'/>

                                <Text>
                                   You may find some of my technical {' '}
                                    <Link href="/learning" className="text-purple-500 font-bold hover:underline">
                                    notes and tutorials
                                    </Link>
                                    ‎ on various topics interesting. I also try to document what I am reading for pleasure. You can take a look at those{' '}
                                    <Link href="/reading" className="text-purple-500 font-bold hover:underline">
                                        here
                                    </Link>
                                    . You can also find some of my other notes and writings on my {' '}
                                    <Link href="/blog" className="text-purple-500 font-bold hover:underline">
                                        blog
                                    </Link>
                                    .
                                </Text>
                        </motion.div>
                    </motion.div>
                </StackVertical>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="mt-8 -mb-8"
            >
                <div className="relative w-full aspect-[4/3] sm:aspect-[2/1] md:aspect-[21/9] rounded-lg overflow-hidden">
                    <Image
                        className="object-cover"
                        fill
                        src="/pretty.jpg" 
                        alt="A photo of a huge shrub dotted with flowers inside the Jamia campus that I took in November 2023."
                        priority
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 80vw"
                    />
                </div>
            </motion.div>
        </motion.div>
    )
} 
