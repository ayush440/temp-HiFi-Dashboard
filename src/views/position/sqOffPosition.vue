<template>
    <Modal1 size="lg" :popup = "true" :show = "showSqOffModal" @close="showSqOffModal = false">
      <template #body>
          <div class="text-center">
              <div class="text-3xl">Are you sure?</div>
              <div class="text-slate-500 dark:text-slate-200 mt-2">
                Do you really want to squre off?  <br />
              </div>
          </div>
          <div class="px-5 py-2 text-center">
              <button type="button" @click="showSqOffModal = false" class="btn-close">
                  No
              </button>
              <button type="button" @click="confirm" class="btn-danger">Yes</button>
          </div>
      </template>
    </Modal1>

    <Modal1 size="lg" :popup = "true" :show = "showCloseModal" @close="showCloseModal = false">
      <template #body>
          <div class="text-center">
              <div class="text-3xl">Are you sure?</div>
              <div class="text-slate-500 dark:text-slate-200 mt-2">
                Do you really want to close?  <br />
              </div>
          </div>
          <div class="px-5 py-2 text-center">
              <button type="button" @click="showCloseModal = false" class="btn-close">
                  No
              </button>
              <button type="button" @click="confirmClose" class="btn-danger">Yes</button>
          </div>
      </template>
    </Modal1>
</template>

<script setup lang="ts">
  import { storeToRefs } from "pinia";
  import { usePositionsStore } from "@/stores/matrix/position";

  const positionsStore = usePositionsStore();
  const { showSqOffModal, showCloseModal } = storeToRefs(positionsStore)
  const { sqOffPosition, closePosition } = positionsStore
  

  
  async function confirm() {
    let message:any=sqOffPosition();
    if(message){
        showSqOffModal.value = false;
    }
  }

  async function confirmClose() {
    let message:any=closePosition();
    if(message){
        showCloseModal.value = false;
    }
  }
</script>
  