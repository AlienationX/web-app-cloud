// TODO 接口请求返回的数据

export const publicRoutes = [
    {
        path: '/login',
        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        // component: LoginView,
        component: () => import('../views/LoginView.vue'),
        name: 'login', // 如果使用name属性，可以避免path写错或方便修改？
        meta: {
            title: '登录',
            icon: '',
            hidden: true,
        },
    },
    {
        path: '/register',
        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        // component: LoginView,
        component: () => import('../views/RegisterView.vue'),
        name: 'register', // 如果使用name属性，可以避免path写错或方便修改？
        meta: {
            title: '注册',
            icon: '',
            hidden: true,
        },
    },
    {
        path: '/production',
        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        // component: LoginView,
        component: () => import('../views/ProductionView.vue'),
        name: 'production', // 如果使用name属性，可以避免path写错或方便修改？
        meta: {
            title: '产品下载',
            icon: '',
            hidden: true,
        },
    },

    {
        path: '/',
        component: () => import('../components/layout/index.vue'),
        name: '/',
        meta: {
            title: '首页',
            icon: '',
            hidden: false,
            location: 'nav',
        },
        redirect: '/home',
        children: [
            {
                path: '/home',
                component: () => import('../views/HomeView.vue'),
                name: 'home',
                meta: {
                    title: '首页',
                    icon: 'mdi-home',
                    hidden: false,
                    location: 'nav',
                },
            },
            {
                path: '/document',
                name: 'document',
                component: () => import('../views/DocumentView.vue'),
                meta: {
                    title: '文档',
                    icon: 'mdi-book-open-variant',
                    hidden: false,
                    location: 'nav',
                },
            },
            {
                path: '/workbench',
                name: 'workbench',
                component: () => import('../views/WorkbenchView.vue'),
                meta: {
                    title: '示例',
                    icon: 'mdi-view-grid-plus',
                    hidden: false,
                    location: 'nav',
                },
            },
            {
                path: '/about',
                component: () => import('../views/AboutView.vue'),
                name: 'about',
                meta: {
                    title: '关于',
                    icon: 'mdi-information',
                    hidden: false,
                    location: 'nav',
                },
            },
        ],
    },

    {
        path: '/acl',
        component: () => import('../components/layout/index.vue'),
        name: 'acl',
        meta: {
            title: '系统管理',
            icon: '',
            hidden: false,
            location: 'nav',
        },
        redirect: '/acl/user',
        children: [
            {
                // 可以配置为user，会默认拼接，但是一级按钮不点击路由跳转会报错，所以还需要写完整路径
                // path会作为for循环的key，完整路径可以保证唯一性？
                path: '/acl/user',
                component: () => import('../views/acl/UserView.vue'),
                name: 'user',
                meta: {
                    title: '用户管理',
                    icon: 'mdi-account',
                    hidden: false,
                    location: 'nav',
                },
            },
            {
                path: '/acl/role',
                name: 'role',
                component: () => import('../views/acl/RoleView.vue'),
                meta: {
                    title: '角色管理',
                    icon: 'mdi-account-multiple',
                    hidden: false,
                    location: 'nav',
                },
            },
            {
                path: '/acl/permission',
                name: 'permission',
                component: () => import('../views/acl/PermissionView.vue'),
                meta: {
                    title: '权限管理',
                    icon: 'mdi-shield-lock-open',
                    hidden: false,
                    location: 'nav',
                },
            },
            {
                path: '/acl/connection',
                name: 'connection',
                component: () => import('../views/acl/PermissionView.vue'),
                meta: {
                    title: '数据源配置',
                    icon: 'mdi-database-cog',
                    hidden: false,
                    location: 'nav',
                },
            },
        ],
    },

    {
        path: '/:pathMatch(.*)*',
        component: () => import('../views/404View.vue'),
        name: 'any', // NotFound
        meta: {
            hidden: true,
        },
    },
];

export const privateRoutes = [
    {
        path: '/analysis',
        component: () => import('../components/layout/index.vue'),
        name: 'analysis',
        meta: {
            title: '智能分析',
            icon: 'mdi-chart-timeline-variant-shimmer',
            hidden: false,
            location: 'side',
        },
        redirect: '/analysis/report',
        children: [
            {
                // 可以配置为user，会默认拼接，但是一级按钮不点击路由跳转会报错，所以还需要写完整路径
                // path会作为for循环的key，完整路径可以保证唯一性？
                path: '/analysis/report',
                component: () => import('../views/analysis/ReportView.vue'),
                name: 'report',
                meta: {
                    title: 'Report',
                    icon: 'mdi-chart-line',
                    hidden: false,
                    location: 'side',
                },
            },
            {
                path: '/analysis/olap',
                name: 'olap',
                component: () => import('../views/TemplateView.vue'),
                meta: {
                    title: 'OLAP',
                    icon: 'mdi-chart-tree',
                    hidden: false,
                    location: 'side',
                },
            },
        ],
    },

    {
        path: '/organization',
        component: () => import('../components/layout/index.vue'),
        name: 'organization',
        meta: {
            title: '医院总览',
            icon: 'mdi-hospital-box',
            hidden: false,
            location: 'side',
        },
        redirect: '/organization/overview',
        children: [
            {
                // 可以配置为user，会默认拼接，但是一级按钮不点击路由跳转会报错，所以还需要写完整路径
                // path会作为for循环的key，完整路径可以保证唯一性？
                path: '/organization/overview',
                component: () => import('../views/TemplateView.vue'),
                name: 'overview',
                meta: {
                    title: '医院画像',
                    icon: 'mdi-chart-bar-stacked',
                    hidden: false,
                    location: 'side',
                },
            },
            {
                path: '/organization/indicator',
                name: 'indicator',
                component: () => import('../views/TemplateView.vue'),
                meta: {
                    title: '指标体系',
                    icon: 'mdi-chart-tree',
                    hidden: false,
                    location: 'side',
                },
            },
        ],
    },

    {
        path: '/medical',
        component: () => import('../components/layout/index.vue'),
        name: 'medical',
        meta: {
            title: '欺诈风控',
            icon: 'mdi-chart-donut-variant',
            hidden: false,
            location: 'side',
        },
        redirect: '/medical/macro',
        children: [
            {
                // 可以配置为user，会默认拼接，但是一级按钮不点击路由跳转会报错，所以还需要写完整路径
                // path会作为for循环的key，完整路径可以保证唯一性？
                path: '/medical/macro',
                component: () => import('../views/TemplateView.vue'),
                name: 'macro',
                meta: {
                    title: '城市宏观指标体系',
                    icon: 'mdi-chart-line',
                    hidden: false,
                    location: 'side',
                },
            },
            {
                path: '/medical/risk',
                name: 'risk',
                component: () => import('../views/TemplateView.vue'),
                meta: {
                    title: '欺诈风控模型',
                    icon: 'mdi-chart-tree',
                    hidden: false,
                    location: 'side',
                },
            },
            {
                path: '/medical/module',
                name: 'module',
                component: () => import('../views/TemplateView.vue'),
                meta: {
                    title: '风控模型维护',
                    icon: 'mdi-chart-tree',
                    hidden: false,
                    location: 'side',
                },
            },
            {
                path: '/medical/task',
                name: 'task',
                component: () => import('../views/TemplateView.vue'),
                meta: {
                    title: '建模任务管理',
                    icon: 'mdi-chart-tree',
                    hidden: false,
                    location: 'side',
                },
            },
            {
                path: '/medical/hospital',
                name: 'hospital',
                component: () => import('../views/TemplateView.vue'),
                meta: {
                    title: '医院多算子模型综合分析',
                    icon: 'mdi-chart-tree',
                    hidden: false,
                    location: 'side',
                },
            },
            {
                path: '/medical/patient',
                name: 'patient',
                component: () => import('../views/TemplateView.vue'),
                meta: {
                    title: '患者多算子模型综合分析',
                    icon: 'mdi-chart-tree',
                    hidden: false,
                    location: 'side',
                },
            },
        ],
    },

    {
        path: '/repository',
        component: () => import('../components/layout/index.vue'),
        name: 'repository',
        meta: {
            title: '医学知识库维护',
            icon: 'mdi-package-variant-closed',
            hidden: false,
            location: 'side',
        },
        redirect: '/repository/rule',
        children: [
            {
                // 可以配置为user，会默认拼接，但是一级按钮不点击路由跳转会报错，所以还需要写完整路径
                // path会作为for循环的key，完整路径可以保证唯一性？
                path: '/repository/rule',
                component: () => import('../views/TemplateView.vue'),
                name: 'rule',
                meta: {
                    title: '规则库',
                    icon: 'mdi-pencil-ruler',
                    hidden: false,
                    location: 'side',
                },
            },
            {
                path: '/repository/case',
                name: 'case',
                component: () => import('../views/TemplateView.vue'),
                meta: {
                    title: '案例库',
                    icon: 'mdi-format-list-bulleted',
                    hidden: false,
                    location: 'side',
                },
            },
            {
                path: '/repository/drug',
                name: 'drug',
                component: () => import('../views/TemplateView.vue'),
                meta: {
                    title: '药品规则库',
                    icon: 'mdi-pill',
                    hidden: false,
                    location: 'side',
                },
            },
            {
                path: '/repository/drug-case',
                name: 'DrugCase',
                component: () => import('../views/TemplateView.vue'),
                meta: {
                    title: '药品案例库',
                    icon: 'mdi-format-list-group',
                    hidden: false,
                    location: 'side',
                },
            },
            {
                path: '/repository/algorithm',
                name: 'algorithm',
                component: () => import('../views/TemplateView.vue'),
                meta: {
                    title: '算法模型库',
                    icon: 'mdi-numeric-9-plus-box-multiple',
                    hidden: false,
                    location: 'side',
                },
            },
        ],
    },
];

// 拆分成多个routes，分默认路由和接口返回的路由，最后再组合
// routes = [...constantRoute, ...userAsyncRoute, anyRoute]
export const routes = [...publicRoutes, ...privateRoutes];
