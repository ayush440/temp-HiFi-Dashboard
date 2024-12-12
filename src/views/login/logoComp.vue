<template>

    <!-- <img v-if="imgName" :src="'/images/logo/' + imgName + '.png'" @load="handleImageLoad" @error="handleImageError" class="w-[249px] h-16" :class="{ 'hidden': !imgLoad }" />
    <div v-if="!imgLoad" class="flex w-full font-bold justify-center mt-[-5px] text-3xl text-gray-600 dark:text-tableText">
        {{ domainName }}
    </div> -->
    <img src="@/assets/img/hifilogo.png"  />


</template>


<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { onBeforeMount, ref, computed } from 'vue'
import { useLogoStore } from '@/stores/utils/logo'


const logoStore = useLogoStore()
const { logoData } = storeToRefs(logoStore)

onBeforeMount(() => {
  const url = window.location.href
  getDomain(url)
})

const imgName = ref('')
const imgLoad = ref(false)

const domainName = computed(() => {
  return logoData.value
})


function  handleImageLoad() {
  imgLoad.value = true
}
function handleImageError(error: any) {
  imgLoad.value = false
}




const getDomain = (url: string) => {
  const parsedUrl = new URL(url);
//   const parsedUrl = new URL('https://www.admin.xyz.in.netlify.app/');

    let count = 0, newHostname = '';
    let urlHostNameArray = parsedUrl.hostname.split(".");

    for (let i = 0; i < urlHostNameArray.length; i++) {
        if(urlHostNameArray[i] == "www" && count == 0){
            continue;
        } else if(count == 0){
            count = 1;
        } else {
            newHostname += urlHostNameArray[i] + "_"
        }
    }

    imgName.value = newHostname.slice(0, -1);
} 

</script>