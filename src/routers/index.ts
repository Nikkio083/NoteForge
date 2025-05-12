import {createWebHistory, createRouter} from 'vue-router';

import LoginView from "../views/LoginView.vue";
import ChiSiamoView from "@/views/ChiSiamoView.vue";
import HomeView from "@/views/HomeView.vue";
import RegistraView from "@/views/RegistraView.vue";
import VisualizzaView from "@/views/VisualizzaView.vue";
import RisultatoView from "@/views/RisultatoView.vue";
import CaricaFile from "@/views/CaricaFile.vue";

const routes = [
    {path: "/login", name:"login", component: LoginView},
    {path: "/chisiamo", name:"chisiamo", component: ChiSiamoView},
    {path: "/home", name:"home", component: HomeView},
    {path: "/registra", name:"registra", component: RegistraView},
    {path: "/ris", name:"risultato", component: RisultatoView},
    {path: "/profilo", name:"profilo", component: () => import('@/views/ProfilePage.vue')},
    {path: "/carica", name:"carica", component: CaricaFile},
    {path: "/visualizza", name:"visualizza", component: VisualizzaView},
    {path: "/:pathMatch(.*)*", redirect: "/home"},
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
