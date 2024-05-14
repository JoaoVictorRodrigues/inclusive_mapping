import { createRouter, createWebHistory } from "vue-router"
import Map from '../views/SubPages/Map.vue'
import UserManagement from '../views/SubPages/UserManagement.vue'
import BeaconManagement from "@/views/SubPages/BeaconManagement.vue"
import PathManagement from '../views/SubPages/PathManagement.vue'
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
        component: UserManagement
    },
    {
        path: '/pathManagement',
        name: 'PathManagement',
        component: PathManagement
    },
    {
        path: '/Beacons',
        name: 'Beacons',
        component: BeaconManagement
    },
    {
        path: '/UserProfile',
        name: 'UserProfile',
        component: BeaconManagement
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env),
    routes
})

export default router