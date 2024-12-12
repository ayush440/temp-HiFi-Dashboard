<template>
  <Modal1 size="lg" :popup = "true" :show = "showDeleteConfirmationModal" @close="showDeleteConfirmationModal = false">
      
      <template #body>
          <div class="text-center">
              <div class="text-3xl">Are you sure?</div>
              <div class="text-slate-500 dark:text-slate-200 mt-2">
                  Do you really want to delete these records? <br />This process cannot
                  be undone.
              </div>
          </div>
          <div class="px-5 py-2 text-center">
              <button type="button" @click="showDeleteConfirmationModal = false" class="btn-close">
                  Cancel
              </button>
              <button type="button" @click="confirm" class="btn-danger">Delete</button>
          </div>
      </template>
      
  </Modal1>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { useMatrixJoinersStore } from '@/stores/matrix/matrixJoiner'
  const matrixJoinersStore = useMatrixJoinersStore()

  const { showDeleteConfirmationModal, idForDelete } = storeToRefs(matrixJoinersStore)

  const { deleteMatrixJoiner } = matrixJoinersStore

  async function confirm() {
    await deleteMatrixJoiner(idForDelete.value)
    showDeleteConfirmationModal.value = false
    idForDelete.value = 0
  }
</script>
