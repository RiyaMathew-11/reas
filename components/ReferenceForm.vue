<template>
  <div>
    <h2 class="text-2xl font-bold mb-6">{{ editingId ? 'Edit Reference' : 'Add New Reference' }}</h2>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <!-- Reference Type -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Reference Type *</label>
        <select
          v-model="formData.type"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="journal">Journal Article</option>
          <option value="book">Book</option>
          <option value="website">Website</option>
        </select>
      </div>

      <!-- Common Fields -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          {{ formData.type === 'website' ? 'Author(s)/Organization' : 'Author(s)' }} *
        </label>
        <input
          v-model="formData.authors"
          required
          type="text"
          placeholder="Surname, I., Surname, I."
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p class="text-xs text-gray-500 mt-1">Format: Surname, Initial(s). (e.g., Smith, J., Doe, A.)</p>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Year *</label>
        <input
          v-model="formData.year"
          required
          type="text"
          pattern="\d{4}"
          placeholder="2024"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <!-- Journal-specific fields -->
      <template v-if="formData.type === 'journal'">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Article Title *</label>
          <input
            v-model="formData.articleTitle"
            required
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Journal Name *</label>
          <input
            v-model="formData.journalName"
            required
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Volume *</label>
            <input
              v-model="formData.volume"
              required
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Issue *</label>
            <input
              v-model="formData.issue"
              required
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Page Range *</label>
          <input
            v-model="formData.pageRange"
            required
            type="text"
            placeholder="1-10"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">DOI (optional)</label>
          <input
            v-model="formData.doi"
            type="text"
            placeholder="10.1000/xyz123"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </template>

      <!-- Book-specific fields -->
      <template v-if="formData.type === 'book'">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Book Title *</label>
          <input
            v-model="formData.bookTitle"
            required
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Publisher *</label>
          <input
            v-model="formData.publisher"
            required
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Place of Publication *</label>
          <input
            v-model="formData.placeOfPublication"
            required
            type="text"
            placeholder="London"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Edition (optional)</label>
          <input
            v-model="formData.edition"
            type="text"
            placeholder="2nd"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </template>

      <!-- Website-specific fields -->
      <template v-if="formData.type === 'website'">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Page Title *</label>
          <input
            v-model="formData.pageTitle"
            required
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Website Name *</label>
          <input
            v-model="formData.websiteName"
            required
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">URL *</label>
          <input
            v-model="formData.url"
            required
            type="url"
            placeholder="https://example.com"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Access Date *</label>
          <input
            v-model="formData.accessDate"
            required
            type="date"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </template>

      <!-- Duplicate Warning -->
      <div v-if="duplicateWarning" class="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded">
        <p class="text-sm">⚠️ A similar reference already exists in your list.</p>
      </div>

      <!-- Action Buttons -->
      <div class="flex gap-3 pt-4">
        <button
          type="submit"
          class="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors font-medium"
        >
          {{ editingId ? 'Update Reference' : 'Add Reference' }}
        </button>
        <button
          type="button"
          @click="cancelEdit"
          class="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors font-medium"
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import type { ReferenceType } from '~/types/reference'

const emit = defineEmits<{
  saved: []
  cancelled: []
}>()

const props = defineProps<{
  editingId?: string
  editingData?: any
}>()

const { addReference, updateReference, checkDuplicate } = useReferences()

const formData = reactive<any>({
  type: 'journal' as ReferenceType,
  authors: '',
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

// Load editing data if provided
watch(() => props.editingData, (data) => {
  if (data) {
    Object.assign(formData, data)
  }
}, { immediate: true })

// Check for duplicates when key fields change
watch([() => formData.authors, () => formData.year, () => formData.type], () => {
  if (formData.authors && formData.year && !props.editingId) {
    duplicateWarning.value = checkDuplicate(formData)
  } else {
    duplicateWarning.value = false
  }
})

const handleSubmit = () => {
  const referenceData = { ...formData }

  // Clean up fields not relevant to current type
  if (referenceData.type === 'journal') {
    delete referenceData.bookTitle
    delete referenceData.publisher
    delete referenceData.placeOfPublication
    delete referenceData.edition
    delete referenceData.pageTitle
    delete referenceData.websiteName
    delete referenceData.url
    delete referenceData.accessDate
  } else if (referenceData.type === 'book') {
    delete referenceData.articleTitle
    delete referenceData.journalName
    delete referenceData.volume
    delete referenceData.issue
    delete referenceData.pageRange
    delete referenceData.doi
    delete referenceData.pageTitle
    delete referenceData.websiteName
    delete referenceData.url
    delete referenceData.accessDate
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
  formData.authors = ''
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
  duplicateWarning.value = false
}
</script>
