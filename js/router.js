import { userNameExists, getUserInfo } from "/js/users.js"
import { user } from "/components/profile.js"
const routes = [
    {
        path: '/user/:id', 
        name: 'user',
        component: user,
        beforeEnter: async (to, from) => {
            if (!await userNameExists(to.params.id.toLowerCase())) {
                window.location.replace('/') 
                // lmao I think vue router does some weird thing to delete all the stuff on the page and it doesn't put it back and since the homepage isn't displayed via a route it gets messed up so instead of changing the route to home, just gonna manually load the page
                return false // so that it doesn't load the view before it runs
            }
            if (from.name != "user" && from.path != "/" && from.path != "/index.html") {
                console.log(from.path)
                window.location.replace(to.path)
            }
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
    {path: '/eventform.html', component: {template: `<template></template>`}},
    {path: '/tracking.html', component: {template: `<template></template>`}},
    {path: '/tracking_one.html', component: {template: `<template></template>`}},
    {path: '/postsearch.html', component: {template: `<template></template>`}},
    {path: '/mylist.html', component: {template: `<template></template>`}},
    {path: '/my_concoctions.html', component: {template: `<template></template>`}},
    {path: '/friends.html', component: {template: `<template></template>`}},
    {path: '/events.html', component: {template: `<template></template>`}},
    {path: '/drinks.html', component: {template: `<template></template>`}},
    {path: '/create_concoction.html', component: {template: `<template></template>`}},
    {path: '/confirm.html', component: {template: `<template></template>`}},
    {path: '/checkout.html', component: {template: `<template></template>`}},
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