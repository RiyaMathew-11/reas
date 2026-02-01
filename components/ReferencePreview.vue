<template>
  <div class="bg-card rounded-xl border border-border shadow-card p-6 transition-shadow hover:shadow-card-hover">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-serif font-semibold text-foreground">Formatted Preview</h2>
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
          @click="handleCopy"
          class="inline-flex items-center gap-2 bg-background text-foreground px-4 py-2 rounded-lg hover:bg-accent transition-all font-medium text-sm border border-input"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          Copy
        </button>
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

    <div v-if="references.length === 0" class="text-center py-20 text-muted-foreground">
      <p class="text-sm">Add references to see the formatted bibliography</p>
    </div>

    <div v-else class="space-y-6">
      <div class="border-b border-border pb-3">
        <h3 class="text-2xl font-serif font-semibold text-center text-foreground">Bibliography</h3>
      </div>

      <div class="space-y-4">
        <div
          v-for="ref in references"
          :key="ref.id"
          class="text-sm leading-relaxed text-foreground py-3 border-b border-border/50 last:border-0"
          style="padding-left: 2rem; text-indent: -2rem;"
        >
          <span v-html="formatReference(ref, selectedFormat)"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { references } = useReferences()
const { formatReference } = useFormatter()
const { exportToDocx } = useDocxExport()

const selectedFormat = ref('harvard')
const isExporting = ref(false)

const handleCopy = () => {
  if (references.value.length === 0) return

  // Generate plain text version
  const bibliography = references.value
    .map(ref => {
      const formatted = formatReference(ref, selectedFormat.value as any)
      // Remove HTML tags for plain text
      return formatted.replace(/<em>/g, '').replace(/<\/em>/g, '')
    })
    .join('\n\n')

  const fullText = `Bibliography\n\n${bibliography}`

  navigator.clipboard.writeText(fullText).then(() => {
    alert('Bibliography copied to clipboard!')
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
