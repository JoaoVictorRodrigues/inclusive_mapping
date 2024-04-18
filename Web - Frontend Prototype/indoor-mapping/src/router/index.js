import { createRouter, createWebHistory } from "vue-router"
import Map from '../views/Map.vue'
import SignPage from "@/views/SignPage.vue"

const routes = [
    {
        path: '/',
        name: 'SignPage',
        component: SignPage
    },
    {
        path: '/map',
        name: 'Map',
        component: Map
    },
    {
        path: '/userManagement',
        name: 'UserManagement',
        component: Map
    },
    {
        path: '/Beacons',
        name: 'Beacons',
        component: Map
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env),
    routes
})

export default router