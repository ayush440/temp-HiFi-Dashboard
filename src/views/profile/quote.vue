
<!-- quote of the day -->
<template>
    <div class="intro-y dark:text-white border shadow  box col-span-12 lg:col-span-6  ml-6 mr-6  ">
        <!-- heading -->
        <div
            class="flex items-center px-5 py-5 sm:py-0 border-b shadow dark:border-darkmode-400"
        >
            <div class="font-medium text-base mr-auto py-2">Quote of the Day</div>
        </div>


        <!-- main quote of the day -->
        <div class="p-5">
            <div class="mt-4">
                <p class="text-slate-500 dark:text-slate-300 text-lg line-clamp-3">
                    {{ quote?quote.item:'' }}
                </p>
            </div>
        </div>  




    </div>
</template>
    
<script setup lang="ts">

const props = defineProps({
    quote: Object   
})

// quote_of_the_day

</script >

<style lang="scss" scoped>
.intro-y {
        @apply border rounded bg-third dark:bg-primary dark:border-none;
    }
</style>