<template>
  <div class="bg-card rounded-xl border border-border p-6 transition-shadow">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-serif font-semibold text-foreground">References <span class="text-muted">({{ references.length }})</span></h2>
      <div class="flex items-center gap-2">
        <select
          v-model="selectedFormat"
          class="px-3 py-2 border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
        >
          <option value="harvard">Harvard</option>
          <option value="apa">APA (Coming Soon)</option>
          <option value="mla">MLA (Coming Soon)</option>
        </select>
        <button
          v-if="references.length > 0"
          @click="handleExport"
          :disabled="isExporting"
          class="inline-flex items-center gap-2 bg-muted text-muted-foreground px-4 py-2 rounded-lg hover:bg-muted/80 transition-all font-medium text-sm disabled:opacity-50"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          {{ isExporting ? 'Exporting...' : 'Download' }}
        </button>
      </div>
    </div>

    <div v-if="references.length === 0" class="text-center py-20">
      <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted/20 mb-4">
        <svg class="w-7 h-7 text-foreground/80" fill="currentColor" viewBox="0 0 24 24">
          <circle cx="9" cy="5" r="1.5"/>
          <circle cx="9" cy="12" r="1.5"/>
          <circle cx="9" cy="19" r="1.5"/>
          <circle cx="15" cy="5" r="1.5"/>
          <circle cx="15" cy="12" r="1.5"/>
          <circle cx="15" cy="19" r="1.5"/>
        </svg>
      </div>
      <p class="text-base font-medium text-foreground mb-1">No references yet</p>
      <p class="text-sm text-muted-foreground">Click "Add Reference" to create your first entry</p>
    </div>

    <div v-else class="space-y-3 text-left">
      <div
        v-for="ref in references"
        :key="ref.id"
        class="group relative text-sm leading-relaxed text-foreground p-4"
      >
        <div class="pr-24">
          <span v-html="formatReference(ref, selectedFormat)"></span>
        </div>

        <!-- Action Icons -->
        <div class="absolute top-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            @click="handleCopy(ref)"
            class="p-2 hover:bg-accent rounded-md transition-colors"
            title="Copy"
          >
            <svg class="w-4 h-4 text-muted-foreground hover:text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
          <button
            @click="$emit('edit', ref)"
            class="p-2 hover:bg-accent rounded-md transition-colors"
            title="Edit"
          >
            <svg class="w-4 h-4 text-muted-foreground hover:text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            @click="$emit('delete', ref.id)"
            class="p-2 hover:bg-destructive/10 rounded-md transition-colors"
            title="Delete"
          >
            <svg class="w-4 h-4 text-destructive hover:text-destructive/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Reference } from '@/types/reference'

defineEmits<{
  edit: [reference: Reference]
  delete: [id: string]
}>()

const { references } = useReferences()
const { formatReference } = useFormatter()
const { exportToDocx } = useDocxExport()

const selectedFormat = ref('harvard')
const isExporting = ref(false)

const handleCopy = (ref: Reference) => {
  const formatted = formatReference(ref, selectedFormat.value as any)
  const plainText = formatted.replace(/<br>/g, '\n').replace(/<em>/g, '').replace(/<\/em>/g, '')

  navigator.clipboard.writeText(plainText).then(() => {
    alert('Reference copied to clipboard!')
  }).catch(err => {
    console.error('Failed to copy:', err)
    alert('Failed to copy to clipboard')
  })
}

const handleExport = async () => {
  isExporting.value = true
  try {
    await exportToDocx(references.value as any, selectedFormat.value)
  } catch (error) {
    console.error('Export failed:', error)
    alert('Failed to export document. Please try again.')
  } finally {
    isExporting.value = false
  }
}
</script>
