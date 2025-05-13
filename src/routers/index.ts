import {createWebHistory, createRouter} from 'vue-router';

import LoginView from "../views/LoginView.vue";
import ChiSiamoView from "@/views/ChiSiamoView.vue";
import HomeView from "@/views/HomeView.vue";
import RegistraView from "@/views/RegistraView.vue";
import VisualizzaView from "@/views/VisualizzaView.vue";
import RisultatoView from "@/views/RisultatoView.vue";
import CaricaFile from "@/views/CaricaFile.vue";

const routes = [
    {path: "/login", name:"login", component: LoginView, meta: {title: "Login"}},
    {path: "/chisiamo", name:"chisiamo", component: ChiSiamoView, meta: {title: "Chi Siamo"}},
    {path: "/", redirect: "/home"},
    {path: "/home", name:"home", component: HomeView,  meta: {title: "Home"}},
    {path: "/registra", name:"registra", component: RegistraView, meta: {title: "Registrati"}},
    {path: "/ris", name:"risultato", component: RisultatoView, meta: {title: "Risultato"}},
    {path: "/profilo", name:"profilo", component: () => import('@/views/ProfilePage.vue'), meta: {title: "Profilo"}},
    {path: "/carica", name:"carica", component: CaricaFile, meta: {title: "Carica"}},
    {path: "/visualizza", name:"visualizza", component: VisualizzaView, meta: {title: "Visualizza"}},
    {path: "/:pathMatch(.*)*", redirect: "/home"},
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const defaultTitle = 'Nome Sito';
    document.title = to.meta.title || defaultTitle;
    next();
});

export default router;
