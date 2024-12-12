<template>
  <Modal
    size="w-[300px] md:w-[400px]"
    v-model="showDeleteConfirmationModal"
    title="Delete This Order Info"
    @confirm="() => confirm()"
  >
    <div class="p-5 text-center">
      <XCircleIcon class="w-16 h-16 text-danger mx-auto mt-3" />
      <div class="text-2xl mt-4">Are you sure?</div>
      <div class="text-gray-500 mt-2">
        Do you really want to delete these records? <br />This process cannot be undone.
      </div>
    </div>
    <div class="flex justify-center items-center space-x-4 p-4">
      <button
        type="button"
        @click="showDeleteConfirmationModal = false"
        class="bg-gray-300 hover:bg-gray-400 text-gray-700 py-1 px-3 rounded"
      >
        Cancel
      </button>

      <button
        type="button"
        @click="confirm"
        class="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
      >
        Delete
      </button>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useOrdersStore } from '@/stores/matrix/order'

const ordersStore = useOrdersStore()

const { showDeleteConfirmationModal, idForDelete } = storeToRefs(ordersStore)

const { deleteOrder } = ordersStore

async function confirm() {
  await deleteOrder(idForDelete.value)
  showDeleteConfirmationModal.value = false
  idForDelete.value = 0
}
</script>
