import type { Reference } from '@/types/reference'
import type { Formatter } from './types'
import { formatAuthors } from './types'

/**
 * Harvard citation format implementation
 * Formatting options for Article, Book, and Website references
 */
export const harvardFormatter: Formatter = {
  formatReference(reference: Reference): string {
    switch (reference.type) {
      case 'journal':
        return formatJournal(reference)
      case 'book':
        return formatBook(reference)
      case 'website':
        return formatWebsite(reference)
    }
  }
}

const formatJournal = (ref: Reference & { type: 'journal' }): string => {
  const authorsStr = formatAuthors(ref.authors)
  const year = ref.year || 'n.d.'
  const title = ref.articleTitle || ''
  const journal = ref.journalName || ''

  let formatted = `${authorsStr} (${year}) '${title}', <em>${journal}</em>`

  if (ref.volume) {
    formatted += `, ${ref.volume}`
  }
  if (ref.issue) {
    formatted += `(${ref.issue})`
  }
  if (ref.pageRange) {
    formatted += `, pp. ${ref.pageRange}`
  }
  if (ref.doi) {
    formatted += `. doi: ${ref.doi}`
  }

  if (ref.url) {
    formatted += `<br>Available at: ${ref.url}`
  }
  if (ref.accessDate) {
    formatted += ` [Accessed ${ref.accessDate}]`
  }

  formatted += '.'
  return formatted
}

const formatBook = (ref: Reference & { type: 'book' }): string => {
  const authorsStr = formatAuthors(ref.authors)
  const year = ref.year || ''
  const title = ref.bookTitle || ''
  const place = ref.placeOfPublication || ''
  const publisher = ref.publisher || ''

  let formatted = `${authorsStr} (${year}) <em>${title}</em>`

  if (ref.edition) {
    formatted += `, ${ref.edition} edn`
  }

  formatted += `. ${place}: ${publisher}.`

  if (ref.url) {
    formatted += `<br>Available at: ${ref.url}`
  }
  if (ref.accessDate) {
    formatted += ` [Accessed ${ref.accessDate}]`
  }

  return formatted
}

const formatWebsite = (ref: Reference & { type: 'website' }): string => {
  const authorsStr = formatAuthors(ref.authors)
  const year = ref.year || ''
  const title = ref.pageTitle || ''
  const siteName = ref.websiteName || ''
  const url = ref.url || ''
  const accessDate = ref.accessDate || ''

  let formatted = `${authorsStr} (${year}) ${title}. [online] ${siteName}.`

  if (url) {
    formatted += `<br>Available at: ${url}`
  }
  if (accessDate) {
    formatted += ` [Accessed ${accessDate}]`
  }

  return formatted
}
