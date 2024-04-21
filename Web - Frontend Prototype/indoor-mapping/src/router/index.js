import { createRouter, createWebHistory } from "vue-router"
import Map from '../views/Map.vue'
import SignPage from "@/views/AuthenticationPages/SignPage.vue"
import LogIn from "@/views/AuthenticationPages/LogIn.vue"
import SignUp from "@/views/AuthenticationPages/SignUp.vue"
import PasswordReset from "@/views/AuthenticationPages/PasswordReset.vue"

const routes = [
    // {
    //     path: '/',
    //     name: 'SignPage',
    //     component: SignPage
    // },
    {
        path: '/',
        name: 'LogIn',
        component: LogIn
    },
    {
        path: '/SignUp',
        name: 'SignUp',
        component: SignUp
    },
    {
        path: '/PasswordReset',
        name: 'PasswordReset',
        component: PasswordReset
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