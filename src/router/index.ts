import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeComponent from '../views/home-component.vue';
import CardCreationComponent from '../views/card-creation-component.vue';
import SignCardComponent from '../views/sign-card-component.vue';
import ConfirmationComponent from '../views/confirmation-component.vue';
import ViewCardComponent from '../views/view-card-component.vue'

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
    path: '/signcard/:id/:template',
    name: 'SignCard',
    component: SignCardComponent
  },
  {
    path: '/confirmation/:id/:template',
    name: 'Confirmation',
    component: ConfirmationComponent
  },
  {
    path: '/card/:id/:template',
    name: 'ViewCard',
    component: ViewCardComponent
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
