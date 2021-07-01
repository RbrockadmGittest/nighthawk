import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeComponent from '../views/home-component.vue';
import CardComponent from '../views/card-component.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: HomeComponent
  },
  {
    path: '/card/:id',
    name: 'Card',
    component: CardComponent
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
