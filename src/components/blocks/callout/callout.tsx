import { cn } from '@/lib/utils/utils'
import Text from '@/components/ui/text/text'
import { Info, AlertTriangle, CheckCircle2, AlertCircle, Lightbulb } from 'lucide-react'
import { monoFont } from '@/styles/fonts/fonts'

interface CalloutProps {
    children: React.ReactNode;
    className?: string;
    variant?: 'purple' | 'orange' | 'green' | 'blue' | 'red';
    title?: string;
    marginTop?: 'none' | 'sm' | 'md' | 'lg';
    marginBottom?: 'none' | 'sm' | 'md' | 'lg';
}

const margins = {
    none: '!m-0',
    sm: '!my-2 sm:!my-2',
    md: '!my-4 sm:!my-4',
    lg: '!my-8 sm:!my-8'
}

const marginTop = {
    none: '!mt-0',
    sm: '!mt-2 sm:!mt-2',
    md: '!mt-4 sm:!mt-4',
    lg: '!mt-8 sm:!mt-8'
}

const marginBottom = {
    none: '!mb-0',
    sm: '!mb-2 sm:!mb-2',
    md: '!mb-4 sm:!mb-4',
    lg: '!mb-8 sm:!mb-8'
}

// Each variant uses one amore palette: shade background, ink text and a light
// border on the light theme; a tinted ink background and light text on the dark one.
const variants = {
    purple: {
        container: 'bg-amore-plum-shade dark:bg-amore-plum-ink/30 text-amore-plum-ink dark:text-amore-plum-shade',
        title: 'text-amore-plum-ink dark:text-amore-plum-light font-bold',
        icon: 'text-amore-plum-main',
        border: 'border-amore-plum-light dark:border-amore-plum-ink',
        Icon: Lightbulb
    },
    orange: {
        container: 'bg-amore-amber-shade dark:bg-amore-amber-ink/30 text-amore-amber-ink dark:text-amore-amber-shade',
        title: 'text-amore-amber-ink dark:text-amore-amber-light font-bold',
        icon: 'text-amore-amber-main',
        border: 'border-amore-amber-light dark:border-amore-amber-ink',
        Icon: AlertTriangle
    },
    red: {
        container: 'bg-amore-red-shade dark:bg-amore-red-ink/30 text-amore-red-ink dark:text-amore-red-shade',
        title: 'text-amore-red-ink dark:text-amore-red-light font-bold',
        icon: 'text-amore-red-main',
        border: 'border-amore-red-light dark:border-amore-red-ink',
        Icon: AlertCircle
    },
    green: {
        container: 'bg-amore-green-shade dark:bg-amore-green-ink/30 text-amore-green-ink dark:text-amore-green-shade',
        title: 'text-amore-green-ink dark:text-amore-green-light font-bold',
        icon: 'text-amore-green-main',
        border: 'border-amore-green-light dark:border-amore-green-ink',
        Icon: CheckCircle2
    },
    blue: {
        container: 'bg-amore-blue-shade dark:bg-amore-blue-ink/30 text-amore-blue-ink dark:text-amore-blue-shade',
        title: 'text-amore-blue-ink dark:text-amore-blue-light font-bold',
        icon: 'text-amore-blue-main',
        border: 'border-amore-blue-light dark:border-amore-blue-ink',
        Icon: Info
    }
}

export default function Callout({ 
    children, 
    className,
    variant = 'purple',
    title,
    marginTop: mt,
    marginBottom: mb
}: CalloutProps) {
    const IconComponent = variants[variant].Icon
    const spacing = mt || mb ? null : 'md'
    
    return (
        <div className={cn(
            monoFont.className,
            'relative p-4 rounded-lg border',
            variants[variant].container,
            variants[variant].border,
            spacing && margins[spacing],
            mt && marginTop[mt],
            mb && marginBottom[mb],
            className
        )}>
            {title && (
                <div className="flex items-center gap-2.5 mb-2.5">
                    <IconComponent size={18} className={cn(variants[variant].icon)} strokeWidth={2.5} />
                    <Text weight="bold" size="sm" className={cn(variants[variant].title)}>{title}</Text>
                </div>
            )}
            <div className="ml-[26px]">
                <Text className={cn("leading-relaxed", variants[variant].container)}>{children}</Text>
            </div>
        </div>
    )
}