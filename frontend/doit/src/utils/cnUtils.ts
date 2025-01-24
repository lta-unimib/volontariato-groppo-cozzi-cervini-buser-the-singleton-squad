import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines class names using `clsx` and merges them with `tailwind-merge` to ensure no conflicting utility classes.
 *
 * This utility function helps manage class names dynamically, applying conditional logic with `clsx` and resolving
 * conflicts between Tailwind CSS classes with `twMerge`. It returns a single string of class names that can be
 * used in JSX elements.
 *
 * @param {...ClassValue[]} inputs - The class names or conditional expressions that will be processed and merged.
 * @returns A string of merged class names ready for use in JSX or HTML elements.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}