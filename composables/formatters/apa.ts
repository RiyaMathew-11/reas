import type { Reference } from '@/types/reference'
import type { Formatter } from './types'
import { formatAuthors } from './types'

/**
 * APA citation format implementation
 * TODO: Implement full APA formatting rules
 * Formatting options needed for Article, Book, and Website references
 */
export const apaFormatter: Formatter = {
  formatReference(reference: Reference): string {
    const authorsStr = formatAuthors(reference.authors)
    return `APA format coming soon - ${authorsStr} (${reference.year})`
  }
}
