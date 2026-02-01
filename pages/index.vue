<template>
  <div class="min-h-screen bg-gray-100 flex flex-col">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Reference List Builder</h1>
            <p class="text-sm text-gray-600 mt-1">Create and manage academic references with Harvard formatting</p>
          </div>
          <button
            @click="showModal = true"
            class="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors font-medium shadow-sm"
          >
            + Add Reference
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content: Stacked Layout -->
    <main class="flex-1 max-w-full mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
      <div class="space-y-6">
        <!-- Reference Table -->
        <div>
          <ReferenceTable @edit="handleEdit" />
        </div>

        <!-- Formatted Preview -->
        <div>
          <ReferencePreview />
        </div>
      </div>
    </main>

    <!-- Modal for Add/Edit Reference -->
    <Modal v-model="showModal">
      <ReferenceForm
        :editing-id="editingId"
        :editing-data="editingData"
        @saved="handleSaved"
        @cancelled="handleCancelled"
      />
    </Modal>
  </div>
</template>

<script setup lang="ts">
import type { Reference } from '~/types/reference'

const showModal = ref(false)
const editingId = ref<string | undefined>(undefined)
const editingData = ref<any>(undefined)

const handleEdit = (reference: Reference) => {
  editingId.value = reference.id
  editingData.value = { ...reference }
  showModal.value = true
}

const handleSaved = () => {
  editingId.value = undefined
  editingData.value = undefined
  showModal.value = false
}

const handleCancelled = () => {
  editingId.value = undefined
  editingData.value = undefined
  showModal.value = false
}
</script>
