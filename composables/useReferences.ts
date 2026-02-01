import type { Reference, ReferenceType } from '@/types/reference'
import { openDB } from 'idb'

/**
 * Composable for managing references with IndexedDB persistence
 * @returns Object containing references array and CRUD operations
 */

const DB_NAME = 'reas-db'
const STORE_NAME = 'references'
const DB_VERSION = 1

export const useReferences = () => {
  const references = useState<Reference[]>('references', () => [])

  // Initialize IndexedDB
  const initDB = async () => {
    if (!process.client) return null

    return openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'id' })
        }
      },
    })
  }

  // Load from IndexedDB on client side
  if (process.client) {
    initDB().then(async (db) => {
      if (!db) return

      try {
        const allRefs = await db.getAll(STORE_NAME)
        if (allRefs.length > 0) {
          references.value = allRefs
        }
      } catch (e) {
        console.error('Failed to load references from IndexedDB', e)
      }
    })
  }

  // Save to IndexedDB
  const saveToIndexedDB = async () => {
    if (!process.client) return

    try {
      const db = await initDB()
      if (!db) return

      const tx = db.transaction(STORE_NAME, 'readwrite')
      await tx.store.clear()

      for (const ref of references.value) {
        await tx.store.put(ref)
      }

      await tx.done
    } catch (e) {
      console.error('Failed to save to IndexedDB:', e)
    }
  }

  const addReference = (reference: Omit<Reference, 'id'>) => {
    const newReference = {
      ...reference,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
    } as Reference
    references.value.push(newReference)
    sortReferences()
    saveToIndexedDB()
  }

  const updateReference = (id: string, updatedReference: Omit<Reference, 'id'>) => {
    const index = references.value.findIndex(ref => ref.id === id)
    if (index !== -1) {
      references.value[index] = { ...updatedReference, id } as Reference
      sortReferences()
      saveToIndexedDB()
    }
  }

  const deleteReference = (id: string) => {
    references.value = references.value.filter(ref => ref.id !== id)
    saveToIndexedDB()
  }

  // Need to sort references by author surname - as used in Harvard style referencing
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
      // Compare authors and titles to check for duplicates 
      // TODO: This could be improved to handle more complex cases 
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
    checkDuplicate
  }
}
