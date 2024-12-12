import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

interface Chapter {
  name: string
  lessons: Lesson[]
}

interface Lesson {
  title: string
  videoUrl: string
}

interface Course {
  id: string // Updated to string because API returns UUID
  title: string
  author: string
  thumbnail: string // Thumbnail field matches the API
  chapters: Chapter[]
}

export const useCourseStore = defineStore('course', () => {
  const courses = ref<Course[]>([]) // Initially empty array

  // Function to fetch courses from API
  async function fetchCourses() {
    try {
      const response = await axios.get('http://192.168.31.130:5003/courses') // API endpoint
      courses.value = response.data // Assign API response to the courses array
    } catch (error) {
      console.error('Error fetching courses:', error)
    }
  }

  // Function to get a course by its ID
  const getCourseById = (id: string) => courses.value.find(course => course.id === id)

  return {
    courses,
    fetchCourses,
    getCourseById,
  }
})
