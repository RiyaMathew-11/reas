import type { Reference, FormatType, Author } from '@/types/reference'

export const useFormatter = () => {
  const formatAuthors = (authors?: Author[]): string => {
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

  const formatReference = (reference: Reference, format: FormatType = 'harvard'): string => {
    switch (format) {
      case 'harvard':
        return formatHarvard(reference)
      case 'apa':
        return formatAPA(reference)
      case 'mla':
        return formatMLA(reference)
      default:
        return formatHarvard(reference)
    }
  }

  const formatHarvard = (reference: Reference): string => {
    switch (reference.type) {
      case 'journal':
        return formatHarvardJournal(reference)
      case 'book':
        return formatHarvardBook(reference)
      case 'website':
        return formatHarvardWebsite(reference)
    }
  }

  const formatHarvardJournal = (ref: Reference & { type: 'journal' }): string => {
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

  const formatHarvardBook = (ref: Reference & { type: 'book' }): string => {
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

  const formatHarvardWebsite = (ref: Reference & { type: 'website' }): string => {
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

  const formatAPA = (reference: Reference): string => {
    const authorsStr = formatAuthors(reference.authors)
    return `APA format coming soon - ${authorsStr} (${reference.year})`
  }

  const formatMLA = (reference: Reference): string => {
    const authorsStr = formatAuthors(reference.authors)
    return `MLA format coming soon - ${authorsStr} (${reference.year})`
  }

  return {
    formatReference
  }
}
