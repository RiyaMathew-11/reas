export type ReferenceType = 'journal' | 'book' | 'website'
export type FormatType = 'harvard' | 'apa' | 'mla' 

// Can add more reference types here

export interface Author {
  surname: string
  firstName?: string 
  // Some authors might not have a first name, so it's optional - if it's an organization, it will be just the surname as the name will be in one field
}

export interface BaseReference {
  id: string
  type: ReferenceType
  authors?: Author[]
  year?: string
  url?: string
  accessDate?: string
}

export interface JournalReference extends BaseReference {
  type: 'journal'
  articleTitle?: string
  journalName?: string
  volume?: string
  issue?: string
  pageRange?: string
  doi?: string
}

export interface BookReference extends BaseReference {
  type: 'book'
  bookTitle?: string
  publisher?: string
  placeOfPublication?: string
  edition?: string
}

export interface WebsiteReference extends BaseReference {
  type: 'website'
  pageTitle?: string
  websiteName?: string
}

export type Reference = JournalReference | BookReference | WebsiteReference

