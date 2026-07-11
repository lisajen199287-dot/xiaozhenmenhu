import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: '/console.html',
        redirect: '/'
    },
    {
        path: '/',
        name: 'ConsoleHome',
        component: () => import('@/views/console/UserLayout.vue'),
        children: [
            { path: '', redirect: '/profile' },
            { path: 'profile', name: 'UserProfile', component: () => import('@/views/console/UserBasicInfoView.vue') },
            { path: 'tickets', name: 'UserTickets', component: () => import('@/views/console/UserSupportView.vue') },
            { path: 'api', name: 'UserApi', component: () => import('@/views/console/UserApiView.vue') },
            { path: 'billing', name: 'UserBilling', component: () => import('@/views/console/UserBillingView.vue') },
            { path: 'help', name: 'UserHelp', component: () => import('@/views/console/UserHelpView.vue') }
        ]
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
    scrollBehavior(_to, _from, savedPosition) {
        return savedPosition || { top: 0 }
    }
})

export default router
