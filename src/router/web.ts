import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

// ✅ 最快时机捕获首次访问 URL（在任何路由跳转之前）
if (!sessionStorage.getItem('_cii_first_url')) {
    sessionStorage.setItem('_cii_first_url', window.location.href)
    sessionStorage.setItem('_cii_first_ref', document.referrer || '')
    sessionStorage.setItem('_cii_first_ts', Date.now().toString())
}

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/HomeView.vue')
    },
    {
        path: '/information',
        name: 'Information',
        component: () => import('@/views/InformationView.vue')
    },
    {
        path: '/park-collaboration',
        name: 'ParkCollaboration',
        component: () => import('@/views/ParkCollaborationView.vue')
    },
    {
        path: '/park-collaboration/login',
        name: 'ParkCollaborationLogin',
        component: () => import('@/views/ParkCollaborationLoginView.vue')
    },
    {
        path: '/park-collaboration/auth',
        name: 'ParkCollaborationAuth',
        component: () => import('@/views/ParkCollaborationAuthView.vue')
    },
    {
        path: '/park-collaboration/workbench',
        name: 'ParkCollaborationWorkbench',
        component: () => import('@/views/ParkCollaborationWorkbenchView.vue')
    },
    {
        path: '/digital-employee',
        name: 'DigitalEmployee',
        component: () => import('@/views/DigitalEmployeeLandingView.vue')
    },
    {
        path: '/digital-employee/video-login',
        name: 'DigitalVideoLogin',
        component: () => import('@/views/DigitalVideoLoginView.vue')
    },
    {
        path: '/digital-employee/video-auth',
        name: 'DigitalVideoAuth',
        component: () => import('@/views/DigitalVideoAuthView.vue')
    },
    {
        path: '/digital-employee/video-workbench',
        name: 'DigitalVideoWorkbench',
        component: () => import('@/views/DigitalVideoWorkbenchView.vue')
    },
    {
        path: '/digital-employee/practice-user',
        name: 'EcommercePracticeWorkbench',
        component: () => import('@/views/EcommercePracticeWorkbenchView.vue')
    },
    {
        path: '/ecommerce-ask',
        name: 'EcommerceAskLanding',
        component: () => import('@/views/EcommerceAskLandingView.vue')
    },
    {
        path: '/ecommerce-ask/login',
        name: 'EcommerceAskLogin',
        component: () => import('@/views/EcommerceAskLoginView.vue')
    },
    {
        path: '/ecommerce-ask/auth',
        name: 'EcommerceAskAuth',
        component: () => import('@/views/EcommerceAskAuthView.vue')
    },
    {
        path: '/data-governance',
        name: 'DataGovernanceLanding',
        component: () => import('@/views/DataGovernanceLandingView.vue')
    },
    {
        path: '/data-governance/login',
        name: 'DataGovernanceLogin',
        component: () => import('@/views/DataGovernanceLoginView.vue')
    },
    {
        path: '/data-governance/auth',
        name: 'DataGovernanceAuth',
        component: () => import('@/views/DataGovernanceAuthView.vue')
    },
    {
        path: '/trusted-connector',
        name: 'TrustedConnectorLanding',
        component: () => import('@/views/TrustedConnectorLandingView.vue')
    },
    {
        path: '/trusted-connector/login',
        name: 'TrustedConnectorLogin',
        component: () => import('@/views/TrustedConnectorLoginView.vue')
    },
    {
        path: '/trusted-connector/auth',
        name: 'TrustedConnectorAuth',
        component: () => import('@/views/TrustedConnectorAuthView.vue')
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
        path: '/login/password',
        name: 'LoginPassword',
        component: () => import('@/views/LoginPasswordView.vue')
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
        redirect: '/news'
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
        path: '/cases/:id',
        name: 'CaseDetail',
        component: () => import('@/views/CaseDetailView.vue')
    },

    {
        path: '/intro',
        name: 'PlatformIntro',
        component: () => import('@/views/PlatformIntroView.vue')
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
        path: '/ai-conversation',
        name: 'conversation',
        component: () => import('@/views/conversation.vue')
    },
    {
        path: '/arkclaw/detail',
        name: 'ArkclawDetail',
        component: () => import('@/views/arkclaw/ArkclawDetailView.vue')
    },
    {
        path: '/ecommerce-ai',
        name: 'EcommerceLanding',
        component: () => import('@/views/EcommerceLandingView.vue')
    },
    {
        path: '/lumi',
        name: 'Lumi',
        component: () => import('@/views/lumiView.vue')
    },
    // New routes to fix warnings
    {
        path: '/brain',
        name: 'Brain',
        component: () => import('@/views/EnterpriseBrainView.vue') // Reuse AgentView for Brain
    },
    {
        path: '/app-center',
        name: 'AppCenterRedirect',
        redirect: '/apps'
    },
    {
        path: '/news',
        name: 'NewsList',
        component: () => import('@/views/news/NewsView.vue')
    },
    {
        path: '/legal',
        name: 'Legal',
        component: () => import('@/views/LegalView.vue')
    },
    {
        path: '/privacy',
        name: 'Privacy',
        component: () => import('@/views/PrivacyView.vue')
    },
    {
        path: '/group-usage',
        name: 'GroupUsage',
        component: () => import('@/views/GroupUsageView.vue'),
        meta: { requiresAuth: true }
    },
    // ---- Admin Routes ----
    {
        path: '/system-mgnt-portal/login',
        name: 'AdminLogin',
        component: () => import('@/views/admin/AdminLoginView.vue')
    },
    {
        path: '/admin',
        name: 'Admin',
        component: () => import('@/views/admin/AdminLayout.vue'),
        meta: { requiresAdminAuth: true },
        children: [
            { path: '', name: 'AdminDashboard', component: () => import('@/views/admin/DashboardView.vue') },
            { path: 'articles', name: 'AdminArticles', component: () => import('@/views/admin/ArticlesView.vue') },
            { path: 'events', name: 'AdminEvents', component: () => import('@/views/admin/EventsAdminView.vue') },
            { path: 'events/create', name: 'AdminEventCreate', component: () => import('@/views/admin/EventEditView.vue') },
            { path: 'events/edit/:id', name: 'AdminEventEdit', component: () => import('@/views/admin/EventEditView.vue') },
            {
                path: 'events/registrations',
                name: 'AdminEventRegistrations',
                component: () => import('@/views/admin/EventRegistrationsView.vue')
            },
            {
                path: 'solutions/requests',
                name: 'AdminSolutionRequests',
                component: () => import('@/views/admin/SolutionRequestsAdminView.vue')
            },
            { path: 'users', name: 'AdminUsers', component: () => import('@/views/admin/UsersView.vue') },
            { path: 'intro', name: 'AdminIntro', component: () => import('@/views/admin/AdminIntroView.vue') },
            { path: 'cases', name: 'AdminCases', component: () => import('@/views/admin/CasesAdminView.vue') },
            { path: 'admins', name: 'AdminAdmins', component: () => import('@/views/admin/AdminAdminsView.vue') },
            { path: 'applications', name: 'AdminApplications', component: () => import('@/views/admin/AdminApplicationsView.vue') },
            { path: 'slides', name: 'AdminSlides', component: () => import('@/views/admin/AdminSlidesView.vue') },
            { path: 'stats', name: 'AdminStats', component: () => import('@/views/admin/AdminStatsView.vue') },
            { path: 'logs', name: 'AdminLogs', component: () => import('@/views/admin/AdminLogsView.vue') },
            { path: 'permissions', name: 'AdminPermissions', component: () => import('@/views/admin/AdminAppPermissionsView.vue') },
            { path: 'orders', name: 'AdminOrders', component: () => import('@/views/admin/AdminOrdersView.vue') },
            { path: 'active-users', name: 'AdminActiveUsers', component: () => import('@/views/admin/AdminActiveUsersView.vue') },
            { path: 'tickets', name: 'AdminTickets', component: () => import('@/views/admin/AdminTicketsView.vue') },
        ]
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'WebNotFoundFallback',
        redirect: '/'
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(_to, _from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { top: 0 }
        }
    }
})

// Auth guard
router.beforeEach((to, _from, next) => {
    if (to.matched.some(record => record.meta.requiresAdminAuth)) {
        const token = localStorage.getItem('admin_token')
        if (!token) {
            next('/system-mgnt-portal/login')
        } else {
            next()
        }
    } else if (to.matched.some(record => record.meta.requiresAuth)) {
        const token = localStorage.getItem('token')
        if (!token) {
            next(`/login/password?redirect=${encodeURIComponent(to.fullPath)}`)
        } else {
            next()
        }
    } else {
        next()
    }
})

// Tracking middleware
router.afterEach((to) => {
    // ✅ 只记录内容页，跳过登录/注册页
    if (!to.path.startsWith('/login') && to.path !== '/register') {
        sessionStorage.setItem('_cii_last_path', to.fullPath)
    }
    import('@/utils/tracker').then(({ track }) => {
        track({ event: 'page_view', page: to.fullPath })
    })
})

export default router
