<template>
  <div class="flex flex-col lg:flex-row xs:p-1">
    <!-- Sidebar for Chapters -->
    <aside
      class="lg:w-1/3 bg-white ml-6 mr-6 mt-10 p-4 rounded-lg shadow-md overflow-y-auto max-h-screen lg:max-h-[calc(100vh-4rem)]"
    >
      <h2 class="text-lg font-semibold mb-4">Course Content</h2>
      <div v-for="(chapter, index) in course.chapters" :key="index" class="mb-4">
        <!-- Chapter Section -->
        <div
          class="p-3 rounded cursor-pointer transition-all duration-200"
          :class="{
            'bg-blue-100 border-l-4 border-blue-500': selectedChapter === index,
            'bg-gray-100 hover:bg-gray-50': selectedChapter !== index
          }"
          @click="selectChapter(index)"
        >
          <h3 class="text-base font-medium">
            Chapter {{ index + 1 }}: {{ chapter.name }}
          </h3>
        </div>
        <!-- Lessons for the Selected Chapter -->
        <ul
          v-if="selectedChapter === index"
          class="mt-2 ml-4 space-y-2 text-sm transition-all duration-300"
        >
          <li
            v-for="(lesson, lessonIndex) in chapter.lessons"
            :key="lessonIndex"
            class="cursor-pointer p-2  rounded hover:bg-blue-50 transition-all duration-200"
            :class="{
              'bg-blue-200 text-blue-800 font-semibold': currentVideoUrl === lesson.videoUrl,
              'text-gray-600': currentVideoUrl !== lesson.videoUrl
            }"
            @click="playLesson(lesson.videoUrl, lesson.title)"
          >
            <span>{{ lesson.title }}</span>
          </li>
        </ul>
      </div>
    </aside>

    <!-- Main Video Player Section -->
    <main class="flex-1 bg-white mt-10 mr-6  p-6 rounded-lg shadow-md">
      <h1 class="text-2xl font-bold mb-4">{{ course.title }}</h1>
      <p class="text-sm text-gray-500 mb-6">Instructor: {{ course.author }}</p>

      <!-- Video Player -->
      <div v-if="currentVideoUrl" class="mb-6">
        <h2 class="text-lg font-semibold mb-4">Now Playing: {{ currentLessonTitle }}</h2>
        <div class="relative w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-lg">
          <iframe
            class="absolute top-0 left-0 w-full h-full"
            :src="currentVideoUrl"
            frameborder="0"
            allowfullscreen
          ></iframe>
        </div>
      </div>

      <!-- Placeholder for No Video Selected -->
      <p
        v-else
        class="text-center text-gray-400 italic mt-6"
      >
        Select a chapter and lesson to start learning!
      </p>
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const course = ref({
  title: "Android Studio Masterclass: Conquer the Android IDE",
  author: "Kurt Anderson",
  chapters: [
    {
      name: "Introduction to Android Studio",
      lessons: [
        {
          title: "Setting up Android Studio",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        },
        {
          title: "Understanding the IDE",
          videoUrl: "https://www.youtube.com/embed/3fumBcKC6RE",
        },
      ],
    },
    {
      name: "Building Your First App",
      lessons: [
        {
          title: "Creating a New Project",
          videoUrl: "https://www.youtube.com/embed/VbCWRzfK4Hk",
        },
        {
          title: "Running Your App on Emulator",
          videoUrl: "https://www.youtube.com/embed/J---aiyznGQ",
        },
      ],
    },
  ],
});

const selectedChapter = ref(null);
const currentVideoUrl = ref("");
const currentLessonTitle = ref("");

const selectChapter = (index) => {
  selectedChapter.value = index;
};

const playLesson = (videoUrl, title) => {
  currentVideoUrl.value = videoUrl;
  currentLessonTitle.value = title;
};

// In a real application, you would fetch the course data based on the route parameter
// const courseId = route.params.id;
// fetchCourse(courseId).then(data => course.value = data);
</script>

<style scoped>
@import 'tailwindcss/tailwind.css';

aside::-webkit-scrollbar {
  width: 6px;
}
aside::-webkit-scrollbar-thumb {
  background-color: rgba(100, 149, 237, 0.6);
  border-radius: 6px;
}
aside::-webkit-scrollbar-thumb:hover {
  background-color: rgba(100, 149, 237, 0.8);
}
</style>