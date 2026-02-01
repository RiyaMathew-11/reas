<template>
  <div>
    <h2 class="text-3xl font-serif font-semibold text-foreground mb-6">{{ editingId ? 'Edit Reference' : 'Add New Reference' }}</h2>

    <form @submit.prevent="handleSubmit" class="space-y-5">
      <!-- Reference Type -->
      <div>
        <label for="reference-type" class="block text-sm font-medium text-foreground mb-2">Reference Type</label>
        <select
          id="reference-type"
          v-model="formData.type"
          class="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
        >
          <option value="journal">Journal Article</option>
          <option value="book">Book</option>
          <option value="website">Website</option>
        </select>
      </div>

      <!-- Authors Sub-table -->
      <div>
        <label class="block text-sm font-medium text-foreground mb-2">
          Author(s)/Organization
        </label>

        <!-- Authors List -->
        <div v-if="authors.length > 0" class="mb-3 border border-border rounded-md overflow-hidden">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-accent/50">
              <tr>
                <th class="px-3 py-2 text-left text-xs font-medium text-muted-foreground uppercase">Name</th>
                <th class="px-3 py-2 text-left text-xs font-medium text-muted-foreground uppercase w-20">Action</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="(author, index) in authors" :key="index">
                <td class="px-3 py-2 text-sm">
                  {{ author.type === 'individual' ? `${author.surname}, ${author.firstName}` : author.surname }}
                </td>
                <td class="px-3 py-2 text-sm">
                  <button
                    type="button"
                    @click="removeAuthor(index)"
                    class="text-destructive hover:text-destructive/80 text-xs"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Add Author -->
        <div class="space-y-3 p-3 bg-accent/50 rounded-md border border-border">
          <!-- Toggle Button for Name Type -->
          <div class="flex items-center justify-between">
            <span class="text-sm font-medium text-foreground">Name</span>
            <div class="inline-flex rounded-lg border border-border bg-background p-1">
              <!-- Two Column Format(Surname, Firstname) -->
              <button
                type="button"
                @click="isTwoColumn = false"
                class="flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all"
                :class="!isTwoColumn
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect x="4" y="4" width="7" height="16" stroke-width="2" rx="1"/>
                  <rect x="13" y="4" width="7" height="16" stroke-width="2" rx="1"/>
                </svg>
              </button>

              <!-- One Column Format (Full Name -> typical for Organisations) -->
              <button
                type="button"
                @click="isTwoColumn = true"
                class="flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all"
                :class="isTwoColumn
                  ? 'bg-success text-white shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect x="6" y="4" width="12" height="16" stroke-width="2" rx="1"/>
                </svg>
                <span class="text-xs font-medium">One</span>
              </button>
            </div>
          </div>

          <!-- Input Fields -->
          <div v-if="!isTwoColumn" class="grid grid-cols-2 gap-3">
            <div>
              <input
                v-model="newAuthor.surname"
                type="text"
                placeholder="Surname"
                class="w-full px-3 py-2 border border-input rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <input
                v-model="newAuthor.firstName"
                type="text"
                placeholder="First Name"
                class="w-full px-3 py-2 border border-input rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>
          <div v-else>
            <input
              v-model="newAuthor.surname"
              type="text"
              placeholder="Organization/Author Name"
              class="w-full px-3 py-2 border border-input rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <button
            type="button"
            @click="addAuthor"
            :disabled="!canAddAuthor"
            class="w-full px-3 py-2 bg-primary/10 text-primary rounded-md hover:bg-primary/20 transition-colors text-sm font-medium disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed"
          >
            + Add Author
          </button>
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-foreground mb-1">Year</label>
        <input
          v-model="formData.year"
          type="text"
          pattern="\d{4}"
          placeholder="2024"
          class="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <!-- Journal-specific fields -->
      <template v-if="formData.type === 'journal'">
        <div>
          <label class="block text-sm font-medium text-foreground mb-1">Article Title</label>
          <input
            v-model="formData.articleTitle"
              type="text"
            class="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-foreground mb-1">Journal Name</label>
          <input
            v-model="formData.journalName"
              type="text"
            class="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-foreground mb-1">Volume</label>
            <input
              v-model="formData.volume"
                  type="text"
              class="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-foreground mb-1">Issue</label>
            <input
              v-model="formData.issue"
                  type="text"
              class="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-foreground mb-1">Page Range</label>
          <input
            v-model="formData.pageRange"
              type="text"
            placeholder="1-10"
            class="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-foreground mb-1">DOI (optional)</label>
          <input
            v-model="formData.doi"
            type="text"
            placeholder="10.1000/xyz123"
            class="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-foreground mb-1">URL</label>
          <input
            v-model="formData.url"
            type="url"
            placeholder="https://example.com"
            class="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-foreground mb-1">Access Date</label>
          <input
            v-model="formData.accessDate"
            type="text"
            placeholder="24 Dec. 2024"
            class="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <p class="text-xs text-muted-foreground mt-1">Format: DD Mon. YYYY (e.g., 24 Dec. 2024)</p>
        </div>
      </template>

      <!-- Book-specific fields -->
      <template v-if="formData.type === 'book'">
        <div>
          <label class="block text-sm font-medium text-foreground mb-1">Book Title</label>
          <input
            v-model="formData.bookTitle"
              type="text"
            class="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-foreground mb-1">Publisher</label>
          <input
            v-model="formData.publisher"
              type="text"
            class="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-foreground mb-1">Place of Publication</label>
          <input
            v-model="formData.placeOfPublication"
              type="text"
            placeholder="London"
            class="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-foreground mb-1">Edition (optional)</label>
          <input
            v-model="formData.edition"
            type="text"
            placeholder="2nd"
            class="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-foreground mb-1">URL</label>
          <input
            v-model="formData.url"
            type="url"
            placeholder="https://example.com"
            class="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-foreground mb-1">Access Date</label>
          <input
            v-model="formData.accessDate"
            type="text"
            placeholder="24 Dec. 2024"
            class="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <p class="text-xs text-muted-foreground mt-1">Format: DD Mon. YYYY (e.g., 24 Dec. 2024)</p>
        </div>
      </template>

      <!-- Website-specific fields -->
      <template v-if="formData.type === 'website'">
        <div>
          <label class="block text-sm font-medium text-foreground mb-1">Page Title</label>
          <input
            v-model="formData.pageTitle"
              type="text"
            class="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-foreground mb-1">Website Name</label>
          <input
            v-model="formData.websiteName"
              type="text"
            class="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-foreground mb-1">URL</label>
          <input
            v-model="formData.url"
              type="url"
            placeholder="https://example.com"
            class="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-foreground mb-1">Access Date</label>
          <input
            v-model="formData.accessDate"
            type="text"
            placeholder="24 Dec. 2024"
            class="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <p class="text-xs text-muted-foreground mt-1">Format: DD Mon. YYYY (e.g., 24 Dec. 2024)</p>
        </div>
      </template>

      <!-- Duplicate Warning -->
      <div v-if="duplicateWarning" class="bg-warning/10 border border-warning/20 text-warning px-4 py-3 rounded">
        <p class="text-sm">⚠️ A similar reference already exists in your list.</p>
      </div>

      <!-- Action Buttons -->
      <div class="flex gap-3 pt-4">
        <button
          type="submit"
          class="flex-1 bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors font-medium"
        >
          {{ editingId ? 'Update Reference' : 'Add Reference' }}
        </button>
        <button
          type="button"
          @click="cancelEdit"
          class="flex-1 bg-gray-200 text-foreground px-4 py-2 rounded-md hover:bg-gray-300 transition-colors font-medium"
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import type { ReferenceType, Author } from '@/types/reference'

const emit = defineEmits<{
  saved: []
  cancelled: []
}>()

const props = defineProps<{
  editingId?: string
  editingData?: any
}>()

const { addReference, updateReference, checkDuplicate } = useReferences()

const authors = ref<Author[]>([])
const isTwoColumn = ref(false)
const newAuthor = reactive({
  surname: '',
  firstName: ''
})

const canAddAuthor = computed(() => {
  if (!newAuthor.surname) return false
  if (!isTwoColumn.value && !newAuthor.firstName) return false
  return true
})

const formData = reactive<any>({
  type: 'journal' as ReferenceType,
  year: '',
  // Journal
  articleTitle: '',
  journalName: '',
  volume: '',
  issue: '',
  pageRange: '',
  doi: '',
  // Book
  bookTitle: '',
  publisher: '',
  placeOfPublication: '',
  edition: '',
  // Website
  pageTitle: '',
  websiteName: '',
  url: '',
  accessDate: ''
})

const duplicateWarning = ref(false)

const addAuthor = () => {
  if (!newAuthor.surname) return

  if (isTwoColumn.value) {
    authors.value.push({
      surname: newAuthor.surname.trim()
    })
  } else {
    if (!newAuthor.firstName) return
    authors.value.push({
      surname: newAuthor.surname.trim(),
      firstName: newAuthor.firstName.trim()
    })
  }

  newAuthor.surname = ''
  newAuthor.firstName = ''
  isTwoColumn.value = false
}

const removeAuthor = (index: number) => {
  authors.value.splice(index, 1)
}

// Load editing data if provided
watch(() => props.editingData, (data) => {
  if (data) {
    Object.assign(formData, data)
    if (data.authors && Array.isArray(data.authors)) {
      authors.value = [...data.authors]
    }
  }
}, { immediate: true })

// Check for duplicates when key fields change
watch([() => authors.value, () => formData.year, () => formData.type], () => {
  if (authors.value.length > 0 && formData.year && !props.editingId) {
    const refData = { ...formData, authors: authors.value }
    duplicateWarning.value = checkDuplicate(refData)
  } else {
    duplicateWarning.value = false
  }
}, { deep: true })

const handleSubmit = () => {

  const referenceData = { ...formData, authors: authors.value }

  // Clean up fields not relevant to current type
  if (referenceData.type === 'journal') {
    delete referenceData.bookTitle
    delete referenceData.publisher
    delete referenceData.placeOfPublication
    delete referenceData.edition
    delete referenceData.pageTitle
    delete referenceData.websiteName
  } else if (referenceData.type === 'book') {
    delete referenceData.articleTitle
    delete referenceData.journalName
    delete referenceData.volume
    delete referenceData.issue
    delete referenceData.pageRange
    delete referenceData.doi
    delete referenceData.pageTitle
    delete referenceData.websiteName
  } else if (referenceData.type === 'website') {
    delete referenceData.articleTitle
    delete referenceData.journalName
    delete referenceData.volume
    delete referenceData.issue
    delete referenceData.pageRange
    delete referenceData.doi
    delete referenceData.bookTitle
    delete referenceData.publisher
    delete referenceData.placeOfPublication
    delete referenceData.edition
  }

  if (props.editingId) {
    updateReference(props.editingId, referenceData)
  } else {
    addReference(referenceData)
  }

  resetForm()
  emit('saved')
}

const cancelEdit = () => {
  resetForm()
  emit('cancelled')
}

const resetForm = () => {
  formData.type = 'journal'
  formData.year = ''
  formData.articleTitle = ''
  formData.journalName = ''
  formData.volume = ''
  formData.issue = ''
  formData.pageRange = ''
  formData.doi = ''
  formData.bookTitle = ''
  formData.publisher = ''
  formData.placeOfPublication = ''
  formData.edition = ''
  formData.pageTitle = ''
  formData.websiteName = ''
  formData.url = ''
  formData.accessDate = ''
  authors.value = []
  newAuthor.surname = ''
  newAuthor.firstName = ''
  isTwoColumn.value = false
  duplicateWarning.value = false
}
</script>
