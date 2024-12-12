<template>
  <div class="dark:text-tableText w-[100vw] flex flex-col md:flex-row m-0 p-0 relative main-layout1">
    <!-- navbar container -->
    <div class="bg-third">
      <div class="relative visible md:hidden border-b dark:border-secondary overflow-x-hidden">
        <logoTopbar />
      </div>
      
      <div class="h-screen relative hidden md:block w-16 xl:w-64 2xl:w-72 overflow-y-scroll">
        <sideBar />
      </div>
    </div>

    <!-- main container -->
    <div class="relative md:h-screen flex flex-col bg-third router-view overflow-x-hidden"
      :class="{'h-[calc(100vh-77px)]' : true, 'w-[100vw] lg:w-[calc(100vw-112px] xl:w-[calc(100vw-256px)] 2xl:w-[calc(100vw-288px)]' : true}" 
    >
      <topbar v-model="mode" />
      <router-view :mode="mode" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import logoTopbar from '@/components/logoTopbar/Main.vue'
import sideBar from '@/components/sideBar/Main.vue'
import topbar from '@/components/topbar.vue'

const mode = ref<'paper' | 'live'>('live')
</script>

