import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/pages/HomePage.vue'
import AboutView from "@/pages/AboutPage.vue";
import Services from "@/pages/Services.vue";
import EventsPage from "@/pages/EventsPage.vue";
import EventPage from "@/pages/EventPage.vue";
import Podcasts from "@/pages/Podcasts.vue";
import PodcastPage from "@/pages/PodcastPage.vue";
import BookingsPage from "@/pages/BookingsPage.vue";
import TosPage from "@/pages/TosPage.vue";
import PrivacyPage from "@/pages/PrivacyPage.vue";
import LoginPage from "@/pages/LoginPage.vue";
import AccountPage from "@/pages/guest/AccountPage.vue";
import ConfirmationPage from "@/pages/ConfirmationPage.vue";
import VendorDashboard from "@/pages/vendor/VendorDashboard.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 };
  },
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
      path: '/bookings',
      name: 'bookings',
      component: BookingsPage,
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
    {
      path: '/terms',
      name: 'terms',
      component: TosPage,
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: PrivacyPage,
    },
    {
      path: '/confirmation',
      name: 'confirmation',
      component: ConfirmationPage,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
    },
    {
      path: '/guest/account',
      name: 'account',
      component: AccountPage,
    },
    {
      path: '/vendor/account',
      name: 'vendor',
      component: VendorDashboard,
    },

  ],
})

export default router
