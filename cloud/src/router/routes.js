// TODO 接口请求返回的数据

const routes = [
    {
        path: '/login',
        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        // component: LoginView,
        component: () => import('../views/LoginView.vue'),
        name: 'login',
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
                path: 'home',
                component: () => import('../views/HomeView.vue'),
                name: 'home',
                // meta: {
                //     title: '用户管理',
                //     hidden: false,
                //     icon: 'mdi-users',
                // },
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
            icon: 'mdi-users',
        },
        redirect: '/acl/user',
        children: [
            {
                path: '/acl/user', // 可以配置为user，会默认拼接，但是一级按钮不点击路由跳转会报错，所以还需要写完整路径
                component: () => import('../views/acl/UserView.vue'),
                name: 'user',
                meta: {
                    title: '用户管理',
                    hidden: false,
                    icon: 'mdi-users',
                },
            },
            {
                path: '/acl/role',
                name: 'role',
                component: () => import('../views/acl/RoleView.vue'),
                meta: {
                    title: '角色管理',
                    hidden: false,
                    icon: 'mdi-users',
                },
            },
            {
                path: '/acl/permission',
                name: 'permission',
                component: () => import('../views/acl/PermissionView.vue'),
                meta: {
                    title: '授权管理',
                    hidden: false,
                    icon: 'mdi-users',
                },
            },
        ],
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

    {
        path: '/:pathMatch(.*)*',
        component: () => import('../views/404View.vue'),
        name: 'any', // NotFound
        meta: {
            hidden: true,
        },
    },
];

export default routes;

// 拆分成多个routes，分默认路由和接口返回的路由，最后再组合？
// menuRoutes = [...constantRoute, ...userAsyncRoute, anyRoute]
