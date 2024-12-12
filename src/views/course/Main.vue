<template>
  <div class="min-h-screen bg-white ml-6 mr-6 mt-5 rounded-lg p-6">
    <!-- Title -->
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900">Available Courses</h1>
    </div>
    
    <!-- Courses Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <div
        v-for="course in courses"
        :key="course.id"
        class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
      >
        <div class="relative group cursor-pointer" @click="navigateToCourse(course.id)">
          <!-- Course Thumbnail -->
          <img 
            :src="course.thumbnail" 
            :alt="course.title"
            class="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          >
          <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
        </div>
        
        <!-- Course Details -->
        <div class="p-4">
          <h2 
            class="text-lg font-semibold text-gray-900 line-clamp-2 hover:text-gray-700 cursor-pointer"
            @click="navigateToCourse(course.id)"
          >
            {{ course.title }}
          </h2>
          
          <p class="text-sm text-gray-600 mt-1">{{ course.author }}</p>
        </div>
      </div>
    </div>
    
    <!-- Empty State -->
    <div 
      v-if="courses.length === 0" 
      class="text-center py-12"
    >
      <p class="text-gray-500 text-lg">No courses available yet.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCourseStore } from '@/stores/matrix/course'
import { storeToRefs } from 'pinia'



const router = useRouter()
const courseStore = useCourseStore()
const { courses } = storeToRefs(courseStore)

// Fetch courses on component mount
onMounted(() => {
  courseStore.fetchCourses()
})

// Navigation function
const navigateToCourse = (courseId: string) => {
  router.push(`/coursedetails/${courseId}`)
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
