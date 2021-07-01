import { createApp } from 'vue'
import App from './App.vue'

// Import css
import "@/assets/css/main.css";

import router from './router';

createApp(App).use(router).mount('#app');