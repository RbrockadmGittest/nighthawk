import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeComponent from '../views/home-component.vue';
import CardCreationComponent from '../views/card-creation-component.vue';
import SignCardComponent from '../views/sign-card-component.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: HomeComponent
  },
  {
    path: '/cardcreation/:id',
    name: 'CardCreation',
    component: CardCreationComponent
  },
  {
    path: '/signcard/:id',
    name: 'SignCard',
    component: SignCardComponent
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
