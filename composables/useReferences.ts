import type { Reference, ReferenceType } from '~/types/reference'

export const useReferences = () => {
  const references = useState<Reference[]>('references', () => [])

  // Load from localStorage on client side
  if (process.client) {
    const stored = localStorage.getItem('references')
    if (stored && references.value.length === 0) {
      try {
        references.value = JSON.parse(stored)
      } catch (e) {
        console.error('Failed to load references from localStorage', e)
      }
    }
  }

  // Save to localStorage whenever references change
  const saveToLocalStorage = () => {
    if (process.client) {
      localStorage.setItem('references', JSON.stringify(references.value))
    }
  }

  const addReference = (reference: Omit<Reference, 'id'>) => {
    const newReference = {
      ...reference,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
    } as Reference
    references.value.push(newReference)
    sortReferences()
    saveToLocalStorage()
  }

  const updateReference = (id: string, updatedReference: Omit<Reference, 'id'>) => {
    const index = references.value.findIndex(ref => ref.id === id)
    if (index !== -1) {
      references.value[index] = { ...updatedReference, id } as Reference
      sortReferences()
      saveToLocalStorage()
    }
  }

  const deleteReference = (id: string) => {
    references.value = references.value.filter(ref => ref.id !== id)
    saveToLocalStorage()
  }

  const clearAllReferences = () => {
    references.value = []
    saveToLocalStorage()
  }

  const sortReferences = () => {
    references.value.sort((a, b) => {
      const authorA = getFirstAuthorSurname(a.authors)
      const authorB = getFirstAuthorSurname(b.authors)
      return authorA.localeCompare(authorB)
    })
  }

  const getFirstAuthorSurname = (authors: any): string => {
    if (Array.isArray(authors) && authors.length > 0) {
      return authors[0].surname || ''
    }
    // Fallback for old string format
    if (typeof authors === 'string') {
      const firstAuthor = authors.split(',')[0].trim()
      if (firstAuthor.includes(',')) {
        return firstAuthor.split(',')[0].trim()
      }
      const parts = firstAuthor.split(' ')
      return parts[parts.length - 1]
    }
    return ''
  }

  const checkDuplicate = (reference: Omit<Reference, 'id'>): boolean => {
    return references.value.some(ref => {
      if (ref.type !== reference.type) return false
      if (ref.year !== reference.year) return false

      // Compare authors
      if (JSON.stringify(ref.authors) !== JSON.stringify(reference.authors)) return false

      switch (ref.type) {
        case 'journal':
          return (ref as any).articleTitle === (reference as any).articleTitle
        case 'book':
          return (ref as any).bookTitle === (reference as any).bookTitle
        case 'website':
          return (ref as any).pageTitle === (reference as any).pageTitle
        default:
          return false
      }
    })
  }

  return {
    references: readonly(references),
    addReference,
    updateReference,
    deleteReference,
    clearAllReferences,
    checkDuplicate
  }
}
