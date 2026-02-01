<template>
  <div class="bg-white rounded-lg shadow-md p-6">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-2xl font-bold">Formatted Preview</h2>
      <div class="flex items-center gap-3">
        <select
          v-model="selectedFormat"
          class="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="harvard">Harvard</option>
          <option value="apa">APA (Coming Soon)</option>
          <option value="mla">MLA (Coming Soon)</option>
        </select>
        <button
          v-if="references.length > 0"
          @click="handleExport"
          :disabled="isExporting"
          class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors font-medium text-sm disabled:bg-gray-400"
        >
          {{ isExporting ? 'Exporting...' : 'Download Bibliography' }}
        </button>
      </div>
    </div>

    <div v-if="references.length === 0" class="text-center py-12 text-gray-500">
      <p class="text-lg">No references to preview</p>
      <p class="text-sm mt-2">Your formatted references will appear here</p>
    </div>

    <div v-else class="space-y-4">
      <div class="border-b border-gray-200 pb-2 mb-4">
        <h3 class="text-xl font-bold text-center">Bibliography</h3>
      </div>

      <div class="space-y-3">
        <div
          v-for="ref in references"
          :key="ref.id"
          class="text-sm leading-relaxed"
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
