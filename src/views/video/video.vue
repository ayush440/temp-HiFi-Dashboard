<template>
    <div class="mt-5 w-full h-full md:h-full bg-[third]">
      <div class=" ml-6 mr-6  rounded-lg flex flex-col justify-center border border-secondary bg-secondary ">
        <div class="table-container text-nowrap ">

          <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
            <!-- BEGIN: Video player Layout -->
            <div
              v-if="showTableData && videos.length > 0"
              v-for="(item, i) in videos"
              :key="i"
              class="box mt-2 px-2"
            >
              <div class="p-0 overflow-hidden bg-secondary-light rounded-md border border-slate-200 shadow-lg">
                <div class="h-40 2xl:h-56 image-fit">
                  <videosList :videoId="item.url" />
                </div>
                <div class="p-4 pt-0">
                  <a href="" class="block text-wrap text-center font-medium text-base mt-4">
                    {{ item.title }}
                  </a>
                  <div class="mt-1 text-wrap">{{ item.description }}</div>
                  <!-- <div class="text-slate-600 dark:text-slate-500 dark:text-slate-200 mt-2">
                          {{ faker.news[0].shortContent }}
                      </div> -->  
                </div>              
              </div>
            </div>

            <div v-else-if="!showTableData"
                      class="col-span-6 sm:col-span-3 xl:col-span-2 flex flex-col justify-end items-center">
                      <LoadingIcon icon="puff" class="w-8 h-8" />
                  </div>

            <div v-else>
              <td class="text-center p-2">Data not found!!</td>
            </div>
          </div>

        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { ref, computed } from 'vue'
  import { useVideosStore } from '@/stores/matrix/video'
  import videosList from './videosList.vue'

const videosStore = useVideosStore()
  
  // define interface to ignore type warning error
  interface Video {
    id: number
    url: string
    title: string
    description: string
    
  }
  const videos = computed<Video[]>(() => {
    return videosStore.videos || []
  })
  
  const showTableData = computed<boolean>(() => {
    const state = videosStore.state[videosStore.endpoint];
    return state && state.loading === false;
});


</script>
  
<style scoped>
  .dark .bg-white {
    background-color: #192642;
  }

  .table-container {
    @apply min-h-[50vh] h-[calc(100vh-104px)] sm:h-[calc(100vh-144px)] ml-[2px];
  }
</style>
  