import { Metadata } from 'next'

export const metadata: Metadata = {
   
    title: 'In the time of chimpanzees I was a monkey | subhodeep',
    description: 'I don\'t really know what I\'m doing',
    verification: { 
    google: "JfvlM1XeQizWzQrb51mAuBNk0wpUeRdKKxJ9Voq0BHc" },
    openGraph: {
        title: 'In the time of chimpanzees I was a monkey | subhodeep',
        description: 'I don\'t really know what I\'m doing',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'In the time of chimpanzees I was a monkey | subhodeep',
        description: 'I don\'t really know what I\'m doing',
    }

   
}

export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
} 

