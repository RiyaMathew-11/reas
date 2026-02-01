<template>
  <div class="bg-white rounded-lg shadow-md p-6">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-2xl font-bold">References ({{ references.length }})</h2>
      <button
        v-if="references.length > 0"
        @click="handleClearAll"
        class="text-red-600 hover:text-red-700 text-sm font-medium"
      >
        Clear All
      </button>
    </div>

    <div v-if="references.length === 0" class="text-center py-12 text-gray-500">
      <p class="text-lg">No references yet</p>
      <p class="text-sm mt-2">Add your first reference using the form above</p>
    </div>

    <div v-else class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Authors</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="ref in references" :key="ref.id" class="hover:bg-gray-50">
            <td class="px-4 py-3 whitespace-nowrap">
              <span
                class="px-2 py-1 text-xs font-semibold rounded-full"
                :class="{
                  'bg-blue-100 text-blue-800': ref.type === 'journal',
                  'bg-green-100 text-green-800': ref.type === 'book',
                  'bg-purple-100 text-purple-800': ref.type === 'website'
                }"
              >
                {{ ref.type }}
              </span>
            </td>
            <td class="px-4 py-3 text-sm text-gray-900">{{ ref.authors }}</td>
            <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{{ ref.year }}</td>
            <td class="px-4 py-3 text-sm text-gray-900">
              {{ getTitle(ref) }}
            </td>
            <td class="px-4 py-3 whitespace-nowrap text-sm font-medium">
              <button
                @click="$emit('edit', ref)"
                class="text-blue-600 hover:text-blue-900 mr-3"
              >
                Edit
              </button>
              <button
                @click="handleDelete(ref.id)"
                class="text-red-600 hover:text-red-900"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Reference } from '~/types/reference'

defineEmits<{
  edit: [reference: Reference]
}>()

const { references, deleteReference, clearAllReferences } = useReferences()

const getTitle = (ref: Reference): string => {
  switch (ref.type) {
    case 'journal':
      return ref.articleTitle
    case 'book':
      return ref.bookTitle
    case 'website':
      return ref.pageTitle
  }
}

const handleDelete = (id: string) => {
  if (confirm('Are you sure you want to delete this reference?')) {
    deleteReference(id)
  }
}

const handleClearAll = () => {
  if (confirm('Are you sure you want to clear all references? This action cannot be undone.')) {
    clearAllReferences()
  }
}
</script>
