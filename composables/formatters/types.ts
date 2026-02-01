import type { Reference, Author } from '@/types/reference'

/**
 * Common interface that all formatters must implement
 */
export interface Formatter {
  formatReference(reference: Reference): string
}

/**
 * Shared utility functions for all formatters
 */
export const formatAuthors = (authors?: Author[]): string => {
  if (!authors || authors.length === 0) return ''

  return authors.map((author, index) => {
    let authorName = ''

    if (author.type === 'organization') {
      // Organizations: just the name
      authorName = author.surname
    } else {
      // Individuals: Surname, I.
      const initial = author.firstName ? author.firstName.charAt(0).toUpperCase() + '.' : ''
      authorName = initial ? `${author.surname}, ${initial}` : author.surname
    }

    if (index === 0) {
      return authorName
    } else {
      const connector = index === authors.length - 1 ? ' and ' : ', '
      return `${connector}${authorName}`
    }
  }).join('')
}
