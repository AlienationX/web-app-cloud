// TODO 接口请求返回的数据

export const navRoutes = [
    {
        path: '/login',
        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        // component: LoginView,
        component: () => import('../views/LoginView.vue'),
        name: 'login', // 如果使用name属性，可以避免path写错或方便修改？
        meta: {
            title: '注册',
            icon: '',
            hidden: true,
        },
    },

    {
        path: '/',
        component: () => import('../components/layout/index.vue'),
        meta: {
            title: '首页',
            hidden: false,
            icon: '',
        },
        redirect: '/home',
        children: [
            {
                path: '/home',
                component: () => import('../views/HomeView.vue'),
                name: 'home',
                meta: {
                    title: '首页',
                    hidden: false,
                    icon: 'mdi-users',
                },
            },
            {
                path: '/document',
                name: 'document',
                component: () => import('../views/DocumentView.vue'),
                meta: {
                    title: '文档',
                    hidden: false,
                    icon: 'mdi-users',
                },
            },
            {
                path: '/example',
                name: 'example',
                component: () => import('../views/ExampleView.vue'),
                meta: {
                    title: '示例',
                    hidden: false,
                    icon: 'mdi-users',
                },
            },
            {
                path: '/about',
                component: () => import('../views/AboutView.vue'),
                name: 'about',
                meta: {
                    title: '关于',
                    hidden: false,
                    icon: 'mdi-users',
                },
            },
        ],
    },

    {
        path: '/acl',
        component: () => import('../components/layout/index.vue'),
        name: 'acl',
        meta: {
            title: '权限管理',
            hidden: false,
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
                    hidden: false,
                    icon: 'mdi-account',
                },
            },
            {
                path: '/acl/role',
                name: 'role',
                component: () => import('../views/acl/RoleView.vue'),
                meta: {
                    title: '角色管理',
                    hidden: false,
                    icon: 'mdi-account-multiple',
                },
            },
            {
                path: '/acl/permission',
                name: 'permission',
                component: () => import('../views/acl/PermissionView.vue'),
                meta: {
                    title: '授权管理',
                    hidden: false,
                    icon: 'mdi-shield-lock-open-outline',
                },
            },
        ],
    },

    {
        path: '/document',
        component: () => import('../components/layout/index.vue'),
        meta: {
            title: '文档',
            hidden: false,
            icon: '',
        },
        redirect: '/document',
        children: [
            {
                path: '/document',
                name: 'document',
                component: () => import('../views/DocumentView.vue'),
                meta: {
                    title: '文档',
                    hidden: false,
                    icon: '',
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

export const sideRoutes = [
    {
        path: '/analysis',
        component: () => import('../components/layout/index.vue'),
        name: 'analysis',
        meta: {
            title: '智能分析',
            hidden: false,
        },
        redirect: '/analysis/report',
        children: [
            {
                // 可以配置为user，会默认拼接，但是一级按钮不点击路由跳转会报错，所以还需要写完整路径
                // path会作为for循环的key，完整路径可以保证唯一性？
                path: '/analysis/report',
                component: () => import('../views/acl/UserView.vue'),
                name: 'report',
                meta: {
                    title: 'Report',
                    hidden: false,
                    icon: 'mdi-chart-line',
                },
            },
            {
                path: '/analysis/olap',
                name: 'olap',
                component: () => import('../views/acl/RoleView.vue'),
                meta: {
                    title: '多维分析',
                    hidden: false,
                    icon: 'mdi-chart-tree',
                },
            },
        ],
    },
];

// 拆分成多个routes，分默认路由和接口返回的路由，最后再组合
// menuRoutes = [...constantRoute, ...userAsyncRoute, anyRoute]
export const routes = [...navRoutes, ...sideRoutes];
