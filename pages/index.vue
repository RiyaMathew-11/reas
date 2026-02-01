<template>
  <div class="min-h-screen bg-background flex flex-col">
    <!-- Header -->
    <header class="bg-card border-b border-border">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2 sm:gap-4">
            <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <span class="text-primary font-mono text-lg sm:text-xl font-bold">[=]</span>
            </div>
            <div>
              <h1 class="text-2xl sm:text-3xl font-serif font-bold text-foreground">reas</h1>
              <p class="text-xs sm:text-sm text-muted-foreground mt-0.5 hidden sm:block">Create and manage academic references with ease</p>
            </div>
          </div>
          <button
            @click="showModal = true"
            class="inline-flex items-center gap-2 bg-primary text-primary-foreground px-3 sm:px-5 py-2.5 rounded-lg hover:bg-secondary transition-all font-medium text-sm shadow-sm hover:shadow-md"
            aria-label="Add Reference"
          >
            <svg class="w-5 h-5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            <span class="hidden sm:inline">Add Reference</span>
          </button>
        </div>
      </div>
    </header>

    <main class="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
      <div class="animate-fade-in">
        <!-- References -->
        <ReferencePreview @edit="handleEdit" @delete="handleDelete" />
      </div>
    </main>

    <!-- Footer -->
    <footer class="border-t border-border bg-card mt-auto">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <p class="text-center text-sm text-muted-foreground">
          [=] reas — Simplifying academic citations
        </p>
      </div>
    </footer>

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
import type { Reference } from '@/types/reference'

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

const handleDelete = (id: string) => {
  const { deleteReference } = useReferences()
  if (confirm('Are you sure you want to delete this reference?')) {
    deleteReference(id)
  }
}
</script>
