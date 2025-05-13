import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from "@/routers";

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia)

import {useAuthStore} from "@/stores/authStore.ts";
const authStore = useAuthStore();
await authStore.fetchSession();



app.mount('#app')
