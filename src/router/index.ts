import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/HomeView.vue')
    },
    {
        path: '/infra',
        name: 'Infra',
        component: () => import('@/views/InfraView.vue')
    },
    {
        path: '/agent',
        name: 'Agent',
        component: () => import('@/views/AgentView.vue')
    },
    {
        path: '/engine',
        name: 'Engine',
        component: () => import('@/views/EngineView.vue')
    },
    {
        path: '/news/:id',
        name: 'NewsDetail',
        component: () => import('@/views/news/NewsDetailView.vue')
    },
    {
        path: '/app-center',
        name: 'AppCenter',
        component: () => import('@/views/AppCenterView.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/LoginView.vue')
    },

    {
        path: '/register',
        name: 'Register',
        component: () => import('@/views/RegisterView.vue')
    },
    {
        path: '/apps',
        name: 'AppCenter',
        component: () => import('@/views/AppCenterView.vue')
    },
    {
        path: '/events',
        name: 'Events',
        component: () => import('@/views/EventsView.vue')
    },
    {
        path: '/events/:id',
        name: 'EventDetail',
        component: () => import('@/views/EventDetailView.vue')
    },
    {
        path: '/solutions',
        name: 'Solutions',
        component: () => import('@/views/solutions/SolutionsView.vue')
    },
    {
        path: '/solutions/ecommerce',
        name: 'EcommerceSolutions',
        component: () => import('@/views/solutions/EcommerceSolutionsView.vue')
    },
    {
        path: '/solutions/internet',
        name: 'InternetSolutions',
        component: () => import('@/views/solutions/InternetSolutionsView.vue')
    },
    {
        path: '/solutions/auto',
        name: 'AutoSolutions',
        component: () => import('@/views/solutions/AutoSolutionsView.vue')
    },
    {
        path: '/solutions/consumer',
        name: 'ConsumerSolutions',
        component: () => import('@/views/solutions/ConsumerSolutionsView.vue')
    },
    {
        path: '/solutions/manufacturing',
        name: 'ManufacturingSolutions',
        component: () => import('@/views/solutions/ManufacturingSolutionsView.vue')
    },
    {
        path: '/solutions/park',
        name: 'ParkSolutions',
        component: () => import('@/views/solutions/ParkSolutionsView.vue')
    },
    {
        path: '/solutions/medical',
        name: 'MedicalSolutions',
        component: () => import('@/views/solutions/MedicalSolutionsView.vue')
    },
    {
        path: '/solutions/gov-media',
        name: 'GovMediaSolutions',
        component: () => import('@/views/solutions/GovMediaSolutionsView.vue')
    },
    {
        path: '/cases',
        name: 'Cases',
        component: () => import('@/views/SuccessCasesView.vue')
    },
    {
        path: '/digital-human',
        name: 'DigitalHumanLanding',
        component: () => import('@/views/DigitalHumanLandingView.vue')
    },
    {
        path: '/arkclaw',
        name: 'Arkclaw',
        component: () => import('@/views/arkclaw.vue')
    },
    {
        path: '/writeOff',
        name: 'WriteOff',
        component: () => import('@/views/writeOff.vue')
    },
    {
        path: '/writeOffExclusive/aloneUser',
        name: 'WriteOffExclusive',
        component: () => import('@/views/writeOffExclusive.vue')
    },
    {
        path: '/arkclaw/detail',
        name: 'ArkclawDetail',
        component: () => import('@/views/arkclaw/ArkclawDetailView.vue')
    },

    {
        path: '/intro',
        name: 'PlatformIntro',
        component: () => import('@/views/PlatformIntroView.vue')
    },
    {
        path: '/console',
        name: 'Console',
        component: () => import('@/views/console/UserLayout.vue'),
        meta: { requiresAuth: true }, // Ideally should be true, but for demo maybe optional
        children: [
            { path: '', name: 'UserDashboard', component: () => import('@/views/console/UserDashboardView.vue') },
            // Add placeholders for other routes as needed
            { path: 'apps', name: 'UserApps', component: () => import('@/views/console/UserDashboardView.vue') }, // Reusing for now
            { path: 'api', name: 'UserAPI', component: () => import('@/views/console/UserDashboardView.vue') },
            { path: 'billing', name: 'UserBilling', component: () => import('@/views/console/UserDashboardView.vue') },
            { path: 'settings', name: 'UserSettings', component: () => import('@/views/console/UserDashboardView.vue') }
        ]
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
            { path: '', redirect: '/admin/stats' },
            { path: 'articles', name: 'AdminArticles', component: () => import('@/views/admin/ArticlesView.vue') },
            { path: 'events', name: 'AdminEvents', component: () => import('@/views/admin/EventsAdminView.vue') },
            { path: 'users', name: 'AdminUsers', component: () => import('@/views/admin/UsersView.vue') },
            { path: 'intro', name: 'AdminIntro', component: () => import('@/views/admin/AdminIntroView.vue') },
            { path: 'cases', name: 'AdminCases', component: () => import('@/views/admin/CasesAdminView.vue') },
            { path: 'admins', name: 'AdminAdmins', component: () => import('@/views/admin/AdminAdminsView.vue') },
            // { path: 'navigation', name: 'AdminNavigation', component: () => import('@/views/admin/AdminNavigationView.vue') },
            { path: 'applications', name: 'AdminApplications', component: () => import('@/views/admin/AdminApplicationsView.vue') },
            { path: 'slides', name: 'AdminSlides', component: () => import('@/views/admin/AdminSlidesView.vue') },
            { path: 'stats', name: 'AdminStats', component: () => import('@/views/admin/AdminStatsView.vue') },
            { path: 'logs', name: 'AdminLogs', component: () => import('@/views/admin/AdminLogsView.vue') },
            { path: 'profile', name: 'AdminProfile', component: () => import('@/views/admin/AdminProfileView.vue') }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
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
