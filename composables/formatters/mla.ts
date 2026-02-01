import type { Reference } from '@/types/reference'
import type { Formatter } from './types'
import { formatAuthors } from './types'

/**
 * MLA citation format implementation
 * TODO: Implement full MLA formatting rules
 * Formatting options needed for Article, Book, and Website references
 */
export const mlaFormatter: Formatter = {
  formatReference(reference: Reference): string {
    const authorsStr = formatAuthors(reference.authors)
    return `MLA format coming soon - ${authorsStr} (${reference.year})`
  }
}
