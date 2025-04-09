import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from "@/views/AboutView.vue";
import Services from "@/views/Services.vue";
import EventsPage from "@/views/EventsPage.vue";
import EventPage from "@/views/EventPage.vue";
import Podcasts from "@/views/Podcasts.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component:AboutView,
    },
    {
      path: '/services',
      name: 'services',
      component: Services,
    },
    {
      path: '/events',
      name: 'events',
      component: EventsPage,
    },
    {
      path: '/event/:id',
      name: 'event',
      component: EventPage,
    },
    {
      path: '/podcasts',
      name: 'podcasts',
      component: Podcasts,
    },
    {
      path: '/podcast/:id',
      name: 'podcast',
      component: Podcasts,
    },
  ],
})

export default router
