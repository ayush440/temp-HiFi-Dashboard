import { createRouter, createWebHistory } from 'vue-router'
import { isAuthenticated } from '@/utils/auth'

const routes = [
  {
    path: '/',
    component: () => import('@/layout/topMenu/Main.vue'),
    children: [
      {
        path: '/',
        name: 'dashboard',
        component: () => import('@/views/dashboard/Main.vue'),
        // meta: { requiresAuth: true },
      },
      {
        path: '/profile',
        name: 'profile',
        component: () => import('@/views/profile/Main.vue'),
        // meta: { requiresAuth: true },
      },
      {
        path: '/brokers',
        name: 'brokers',
        component: () => import('@/views/broker/Brokers.vue'),
        // meta: { requiresAuth: true },
      },
      {
        path: '/strategies',
        name: 'strategies',
        component: () => import('@/views/strategy/Main.vue'),
        // meta: { requiresAuth: true },
      },
      {
        path: '/orders',
        name: 'orders',
        component: () => import('@/views/order/Order.vue'),
        // meta: { requiresAuth: true },
      },
      {
        path: '/positions',
        name: 'positions',
        component: () => import('@/views/position/position.vue'),
        // meta: { requiresAuth: true },
      },
      {
        path: '/mystrategies',
        name: 'mystrategies',
        component: () => import('@/views/matrixJoiner/matrixJoiner.vue'),
        // meta: { requiresAuth: true },
      },
      {
        path: '/strategy_details',
        name: 'Strategy Details',
        component: () => import('@/views/sd/Main.vue'),
        // meta: { requiresAuth: true },
      },
      {
        path: '/videos',
        name: 'videos',
        component: () => import('@/views/video/video.vue'),
        // meta: { requiresAuth: true },
      },
      {
        path: '/course',
        name: 'course',
        component: () => import('@/views/course/Main.vue'),
        // meta: { requiresAuth: true },
      },
      {
        path: '/coursedetails/:id',
        name: 'courseDetails',
        component: () => import('@/views/course/CourseDetails.vue'),
        // meta: { requiresAuth: true },
      },
    ]
  },
  // {
  //   path: '/login',
  //   name: 'login',
  //   component: () => import('@/views/login/login.vue')
  // },
  // {
  //   path: '/register',
  //   name: 'register',
  //   component: () => import('@/views/register/Main.vue')
  // },
  // {
  //   path: '/:pathMatch(.*)*',
  //   component: () => import('@/views/NotFound.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     if (!isAuthenticated()) {
      
//       next({ name: 'login' })
//     } else {
//       next()
//     }
//   } else {
//     next()
//   }
// })

export default router

