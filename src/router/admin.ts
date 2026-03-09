import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/admin'
    },
    {
        path: '/admin.html',
        redirect: '/admin'
    },
    {
        path: '/system-mgnt-portal/login',
        name: 'AdminLogin',
        component: () => import('@/views/admin/AdminLoginView.vue')
    },
    {
        path: '/admin',
        name: 'Admin',
        component: () => import('@/views/admin/AdminLayout.vue'),
        meta: { requiresAuth: true },
        children: [
            { path: '', name: 'AdminDashboard', component: () => import('@/views/admin/DashboardView.vue') },
            // Removed /admin prefix, as this app runs on admin.example.com/
            { path: 'articles', name: 'AdminArticles', component: () => import('@/views/admin/ArticlesView.vue') },
            { path: 'events', name: 'AdminEvents', component: () => import('@/views/admin/EventsAdminView.vue') },
            { path: 'users', name: 'AdminUsers', component: () => import('@/views/admin/UsersView.vue') },
            { path: 'profile', name: 'AdminProfile', component: () => import('@/views/admin/AdminProfileView.vue') },
            { path: 'intro', name: 'AdminIntro', component: () => import('@/views/admin/AdminIntroView.vue') },
            { path: 'cases', name: 'AdminCases', component: () => import('@/views/admin/CasesAdminView.vue') },
            { path: 'slides', name: 'AdminSlides', component: () => import('@/views/admin/AdminSlidesView.vue') },
            { path: 'admins', name: 'AdminAdmins', component: () => import('@/views/admin/AdminAdminsView.vue') },
            // { path: 'navigation', name: 'AdminNavigation', component: () => import('@/views/admin/AdminNavigationView.vue') },
            { path: 'applications', name: 'AdminApplications', component: () => import('@/views/admin/AdminApplicationsView.vue') },
            { path: 'permissions', name: 'AdminPermissions', component: () => import('@/views/admin/AdminAppPermissionsView.vue') },
            { path: 'orders', name: 'AdminOrders', component: () => import('@/views/admin/AdminOrdersView.vue') },
            { path: 'stats', name: 'AdminStats', component: () => import('@/views/admin/AdminStatsView.vue') },
            { path: 'active-users', name: 'AdminActiveUsers', component: () => import('@/views/admin/AdminActiveUsersView.vue') },
            { path: 'tickets', name: 'AdminTickets', component: () => import('@/views/admin/AdminTicketsView.vue') },
            { path: 'logs', name: 'AdminLogs', component: () => import('@/views/admin/AdminLogsView.vue') }
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

// Navigation Guard for Admin
router.beforeEach((to, _from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        const token = localStorage.getItem('admin_token')
        if (!token) {
            next('/system-mgnt-portal/login')
        } else {
            next()
        }
    } else {
        next()
    }
})

export default router
