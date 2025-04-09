import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/pages/HomePage.vue'
import AboutView from "@/pages/AboutPage.vue";
import Services from "@/pages/Services.vue";
import EventsPage from "@/pages/EventsPage.vue";
import EventPage from "@/pages/EventPage.vue";
import Podcasts from "@/pages/Podcasts.vue";
import PodcastPage from "@/pages/PodcastPage.vue";

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
      component: PodcastPage,
    },
  ],
})

export default router
