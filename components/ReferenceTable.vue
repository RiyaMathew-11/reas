<template>
  <div class="bg-card rounded-xl border border-border shadow-card p-6 transition-shadow hover:shadow-card-hover">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-serif font-semibold text-foreground">References <span class="text-muted">({{ references.length }})</span></h2>
      <button
        v-if="references.length > 0"
        @click="handleClearAll"
        class="text-destructive hover:text-destructive/80 text-sm font-medium transition-colors"
      >
        Clear All
      </button>
    </div>

    <div v-if="references.length === 0" class="text-center py-20">
      <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted/30 mb-4">
        <svg class="w-7 h-7 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <p class="text-base font-medium text-foreground">No references yet</p>
      <p class="text-sm mt-1 text-muted-foreground">Add your first reference to get started</p>
    </div>

    <div v-else class="overflow-x-auto">
      <table class="min-w-full">
        <thead class="border-b border-border">
          <tr>
            <th class="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Type</th>
            <th class="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Authors</th>
            <th class="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Year</th>
            <th class="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Title</th>
            <th class="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-border/50">
          <tr v-for="ref in references" :key="ref.id" class="hover:bg-accent/50 transition-colors">
            <td class="px-4 py-4 whitespace-nowrap">
              <span
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                :style="{
                  backgroundColor: ref.type === 'journal' ? 'hsl(210 90% 55% / 0.12)' :
                                   ref.type === 'book' ? 'hsl(270 60% 55% / 0.12)' :
                                   'hsl(340 75% 55% / 0.12)',
                  color: ref.type === 'journal' ? 'hsl(210 90% 55%)' :
                         ref.type === 'book' ? 'hsl(270 60% 55%)' :
                         'hsl(340 75% 55%)'
                }"
              >
                {{ ref.type }}
              </span>
            </td>
            <td class="px-4 py-4 text-sm text-foreground">{{ formatAuthorsDisplay(ref.authors) }}</td>
            <td class="px-4 py-4 whitespace-nowrap text-sm text-foreground font-medium">{{ ref.year }}</td>
            <td class="px-4 py-4 text-sm text-foreground">
              {{ getTitle(ref) }}
            </td>
            <td class="px-4 py-4 whitespace-nowrap text-sm font-medium space-x-3">
              <button
                @click="$emit('edit', ref)"
                class="text-primary hover:text-secondary transition-colors"
              >
                Edit
              </button>
              <button
                @click="handleDelete(ref.id)"
                class="text-destructive hover:text-destructive/80 transition-colors"
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
import type { Reference, Author } from '@/types/reference'

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

const formatAuthorsDisplay = (authors: Author[]): string => {
  if (!authors || authors.length === 0) return 'N/A'

  return authors.map((author, index) => {
    let authorName = ''

    if (author.type === 'organization') {
      authorName = author.surname
    } else {
      const initial = author.firstName ? author.firstName.charAt(0).toUpperCase() + '.' : ''
      authorName = initial ? `${author.surname}, ${initial}` : author.surname
    }

    if (index === authors.length - 1 && authors.length > 1) {
      return `and ${authorName}`
    }
    return authorName
  }).join(', ')
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
