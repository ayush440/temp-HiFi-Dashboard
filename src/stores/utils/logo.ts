import { defineStore } from 'pinia'
import { ref, onBeforeMount } from 'vue'
import { makeRequest } from '@/request/request'

export const useLogoStore = defineStore('logo', () => {
  const logoData = ref<string>('')
  const imgName = ref<string>('')
  const count = ref<number>(0)
  const flag = ref<boolean>(false)

  const getLogo = async () => {
    if(count.value !== 0) return
    try{
      const response = await makeRequest('logo', 'GET', {}, {}, {}, 0);
      if(response.data) {
        logoData.value = response.data
        count.value++
      }
    } catch (error) {
      logoData.value = ''
    }
  };

  const getDomain = (url: string) => {
    if(flag.value) return 
    const parsedUrl = new URL(url);
    let hostName = parsedUrl.hostname
    if(hostName == 'localhost'){
    } else {
      let splitedHost = hostName.split('.')
      imgName.value = splitedHost[1] + "_" + splitedHost[2]
    }
    flag.value = true
  } 

  onBeforeMount(() => {
    const url = window.location.href
    getDomain(url)
    getLogo()
  })  

  return {
    logoData,
    imgName,
    getLogo,
    getDomain
  }
})
