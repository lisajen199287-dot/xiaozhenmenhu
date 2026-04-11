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
            { path: '', name: 'UserDashboard', component: () => import('@/views/console/UserDashboardView.vue') },
            { path: 'apps', name: 'UserApps', component: () => import('@/views/console/UserAppsView.vue') },
            { path: 'apikeys', name: 'UserApiKeys', component: () => import('@/views/console/UserApiKeyView.vue') },
            { path: 'api', name: 'UserAPI', component: () => import('@/views/console/UserApiView.vue') },
            { path: 'billing', name: 'UserBilling', component: () => import('@/views/console/UserBillingView.vue') },
            { path: 'lumiBilling', name: 'UserLumiBilling', component: () => import('@/views/console/UserLumiBillingView.vue') },
            { path: 'support', name: 'UserSupport', component: () => import('@/views/console/UserSupportView.vue') },
            { path: 'settings', name: 'UserSettings', component: () => import('@/views/console/UserSettingsView.vue') },
            { path: 'logs', name: 'UserLogs', component: () => import('@/views/console/UserLogsView.vue') }
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
