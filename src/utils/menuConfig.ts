export interface MenuItem {

    name: string

    icon: string

    path: string

}



export interface MenuGroup {

    title: string

    isCollapsed: boolean

    items: MenuItem[]

}



export const menuGroups: MenuGroup[] = [

    {
        title: '运营概览',
        isCollapsed: false,
        items: [
            { name: '流量分析统计', icon: 'fas fa-chart-bar', path: '/admin/stats' },
            { name: '前台用户管理', icon: 'fas fa-users', path: '/admin/users' },
            { name: '在线活跃监控', icon: 'fas fa-users-cog', path: '/admin/active-users' },
            { name: '工单响应中心', icon: 'fas fa-headset', path: '/admin/tickets' },
        ]
    },

    {

        title: '门户内容管理',

        isCollapsed: false,

        items: [

            { name: '平台简介编辑', icon: 'fas fa-info-circle', path: '/admin/intro' },

            { name: '首页轮播管理', icon: 'fas fa-images', path: '/admin/slides' },

            { name: '客户案例管理', icon: 'fas fa-briefcase', path: '/admin/cases' },

            { name: '文章内容管理', icon: 'fas fa-file-alt', path: '/admin/articles' },

            { name: '平台活动管理', icon: 'fas fa-calendar-alt', path: '/admin/events' },
            { name: '活动报名名单', icon: 'fas fa-clipboard-list', path: '/admin/events/registrations' },
            { name: '解决方案需求', icon: 'fas fa-handshake', path: '/admin/solutions/requests' }

        ]

    },

    {

        title: '应用与财务',

        isCollapsed: false,

        items: [

            { name: '应用中心管理', icon: 'fas fa-th-large', path: '/admin/applications' },

            { name: '应用权限分发', icon: 'fas fa-user-lock', path: '/admin/permissions' },

            { name: '财务订单管理', icon: 'fas fa-file-invoice-dollar', path: '/admin/orders' },

        ]

    },


    {

        title: '系统安全设置',

        isCollapsed: false,

        items: [

            { name: '系统管理员', icon: 'fas fa-user-shield', path: '/admin/admins' },

            { name: '操作日志审计', icon: 'fas fa-clipboard-list', path: '/admin/logs' },

        ]

    }

]