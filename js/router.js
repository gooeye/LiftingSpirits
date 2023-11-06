import { userNameExists, getUserInfo } from "/js/users.js"
import { user } from "/components/profile.js"
const routes = [
    {
        path: '/user/:id', 
        name: 'user',
        component: user,
        beforeEnter: async (to) => {
            if (!await userNameExists(to.params.id.toLowerCase())) {
                window.location.replace('/') 
                // lmao I think vue router does some weird thing to delete all the stuff on the page and it doesn't put it back and since the homepage isn't displayed via a route it gets messed up so instead of changing the route to home, just gonna manually load the page
                return false // so that it doesn't load the view before it runs
            }
            console.log("hi")
            return true
        }
    },
    {
        path: '/',
        component: {template: `<template></template>`},
        beforeEnter: async (to) => {
            window.vm.isHome = true
            window.vm.page = 'home'
            return true
        }
    },
    {
        path: '/index.html',
        component: {template: `<template></template>`},
        beforeEnter: async (to) => {
            window.vm.isHome = true
            window.vm.page = 'home'
            return true
        }
    }, 
    { 
        path: '/:pathMatch(.*)*', name: 'not-found', component: {template: `<template></template>`},
        beforeEnter: async (to) => {
            window.location.replace('/') 
            return false
        }
    }
]

export const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    mode: 'history',
    routes, // short for `routes: routes`
})