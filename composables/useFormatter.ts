import type { Reference, FormatType } from '~/types/reference'

export const useFormatter = () => {
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
    let formatted = `${ref.authors} (${ref.year}) '${ref.articleTitle}', <em>${ref.journalName}</em>`

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

    formatted += '.'
    return formatted
  }

  const formatHarvardBook = (ref: Reference & { type: 'book' }): string => {
    let formatted = `${ref.authors} (${ref.year}) <em>${ref.bookTitle}</em>`

    if (ref.edition) {
      formatted += `, ${ref.edition} edn`
    }

    formatted += `. ${ref.placeOfPublication}: ${ref.publisher}.`
    return formatted
  }

  const formatHarvardWebsite = (ref: Reference & { type: 'website' }): string => {
    let formatted = `${ref.authors} (${ref.year}) <em>${ref.pageTitle}</em>, ${ref.websiteName}. Available at: ${ref.url} (Accessed: ${ref.accessDate}).`
    return formatted
  }

  const formatAPA = (reference: Reference): string => {
    // ToDo: APA Format
    return `APA format coming soon - ${reference.authors} (${reference.year})`
  }

  const formatMLA = (reference: Reference): string => {
    // ToDo: MLA Format
    return `MLA format coming soon - ${reference.authors} (${reference.year})`
  }

  return {
    formatReference
  }
}
