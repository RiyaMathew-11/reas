export type ReferenceType = 'journal' | 'book' | 'website'
export type FormatType = 'harvard' | 'apa' | 'mla'

export interface Author {
  type: 'individual' | 'organization'
  surname: string
  firstName?: string // Only for individuals
}

export interface BaseReference {
  id: string
  type: ReferenceType
  authors: Author[]
  year: string
}

export interface JournalReference extends BaseReference {
  type: 'journal'
  articleTitle: string
  journalName: string
  volume: string
  issue: string
  pageRange: string
  doi?: string
}

export interface BookReference extends BaseReference {
  type: 'book'
  bookTitle: string
  publisher: string
  placeOfPublication: string
  edition?: string
}

export interface WebsiteReference extends BaseReference {
  type: 'website'
  pageTitle: string
  websiteName: string
  url: string
  accessDate: string
}

export type Reference = JournalReference | BookReference | WebsiteReference
