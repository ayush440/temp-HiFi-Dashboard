<template>
    <Modal1 size="lg" :popup = "true" :show="showMessage" @close="closeModal">
      <template #body>
          <div class="text-center mb-5">
            <div class="text-lg lg:text-2xl">Message</div>
              <div class="text-sm lg:text-base text-slate-500 dark:text-slate-200 mt-1">
                {{ message ? message : 'Not Found' }}
              </div>
          </div>
      </template>
    </Modal1>
</template>


<script lang="ts" setup>
    import { storeToRefs } from "pinia";
    import { ref, computed} from "vue";
    import { useStrategiesStore } from '@/stores/matrix/strategy'

    const strategiesStore = useStrategiesStore();

    const { showMessage, message } = storeToRefs(strategiesStore)


    const closeModal = () => {
        showMessage.value = false
        message.value = ''
    }


</script>