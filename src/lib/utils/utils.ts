// src/lib/utils/utils.ts
//
// Small helpers shared by the whole site.
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Joins Tailwind class lists into one className string. It skips empty values,
 * so a class can be added conditionally, and when two classes set the same
 * property, the later one wins. That lets a component take a `className` from
 * outside that overrides its defaults. With isActive true:
 *
 *     cn('p-4 text-sm', isActive && 'text-accent', 'p-2')  ->  'text-sm text-accent p-2'
 *
 * `...inputs` means the function takes any number of arguments.
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}
