import { fileURLToPath, URL } from 'node:url';

import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import mkcert from 'vite-plugin-mkcert';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
    // 环境变量通常可以从 process.env 获得, 注意 Vite 默认是不加载 .env 文件的, 如果想加载 .env 文件需要使用loadEnv
    // 根据当前工作目录中的 `mode` 加载 .env 文件
    // 设置第三个参数为 '' 来加载所有环境变量(包括系统环境变量)，而不管是否有 `VITE_` 前缀。
    // const env = loadEnv(mode, process.cwd(), '');
    const env = loadEnv(mode, process.cwd());
    console.log('vite.config.js env', env);
    // console.log('vite.process.env', process.env);  // 只是系统环境变量，但是没有BASE_URL等VITE变量
    // const { BASE_URL } = env;
    return {
        // base: '/web-app-cloud/', // github pages，相当于二级域名
        // base: import.meta.env.BASE_URL,  // ERROR，无法直接使用
        base: env.VITE_APP_BASE_URL,
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url)),
            },
        },
        plugins: [
            vue(),
            mkcert(),
            VitePWA({
                manifest: {
                    name: 'Progressive Times Web App', // 安装应用后显示的应用名
                    short_name: 'Progressive Times',
                    description: '渐进式 Web App',
                    start_url: env.VITE_APP_BASE_URL, // 同vite的二级域名 base 配置
                    // scope: env.VITE_APP_BASE_URL, // 作用域，作用未知
                    display: 'standalone', // fullscreen(无状态栏) standalone(有状态栏) minimal-ui(有地址栏)
                    theme_color: '#B71C1C', // 应用程序的主题颜色（应用栏/状态栏）红色
                    background_color: '#B71C1C', // 启动动画的背景颜色（最好和主题颜色一致？）
                    // related_applications: [
                    //     {
                    //         platform: 'webapp',
                    //         id: 'https://localhost:5173/manifest.json',
                    //     },
                    // ],
                    // orientation: 定义默认应用显示方向，竖屏、横屏
                    // 至少配置一个图标
                    icons: [
                        {
                            src: './static/pwa-icons/manifest-icon-192.maskable.png',
                            sizes: '192x192',
                            type: 'image/png',
                            purpose: 'any',
                        },
                        {
                            src: './static/pwa-icons/manifest-icon-192.maskable.png',
                            sizes: '192x192',
                            type: 'image/png',
                            purpose: 'maskable',
                        },
                        {
                            src: './static/pwa-icons/manifest-icon-512.maskable.png',
                            sizes: '512x512',
                            type: 'image/png',
                            purpose: 'any',
                        },
                        {
                            src: './static/pwa-icons/manifest-icon-512.maskable.png',
                            sizes: '512x512',
                            type: 'image/png',
                            purpose: 'maskable',
                        },
                    ],
                },
                registerType: 'autoUpdate', // autoUpdate prompt
                // includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
                workbox: {
                    // 自定义缓存名称
                    cacheId: 'ego-cache',
                    // 忽略html后面的参数，缓存有参数的html
                    // ignoreURLParametersMatching: [/.*/],
                    //
                    // globIgnores: ['static/js/**'],
                    // 缓存相关静态资源
                    // NetworkFirst：网络优先
                    // CacheFirst：缓存优先
                    // NetworkOnly：仅使用正常的网络请求
                    // CacheOnly：仅使用缓存中的资源
                    // StaleWhileRevalidate：从缓存中读取资源的同时发送网络请求更新本地缓存
                    // globPatterns: ['**/*.{js,css,html,ico,png,jpg,svg}'],
                    globPatterns: [],
                    // 配置自定义运行时缓存，缓存策略等
                    runtimeCaching: [
                        // 配置自定义运行时缓存
                        // mode !== 'production'
                        //     ? {
                        //           urlPattern: ({ url }) => url.origin === 'https://api.github.com',
                        //           handler: 'NetworkFirst', // 网络优先策略
                        //           options: {
                        //               cacheName: 'ego-api',
                        //               cacheableResponse: {
                        //                   statuses: [200], // 缓存的响应状态码
                        //               },
                        //           },
                        //       }
                        //     : {
                        //           urlPattern: ({ url }) => url.origin === 'https://app-api.id',
                        //           handler: 'NetworkFirst',
                        //           options: {
                        //               cacheName: 'ego-api',
                        //               cacheableResponse: {
                        //                   statuses: [200],
                        //               },
                        //           },
                        //       },
                        {
                            urlPattern: ({ url }) => url.origin === 'https://api.github.com',
                            handler: 'NetworkFirst', // 网络优先策略
                            options: {
                                cacheName: 'ego-api',
                                cacheableResponse: {
                                    statuses: [200], // 缓存的响应状态码
                                },
                            },
                        },
                        {
                            urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
                            handler: 'CacheFirst',
                            options: {
                                cacheName: 'ego-images',
                                expiration: {
                                    // 最多100个图
                                    maxEntries: 100,
                                },
                            },
                        },
                        {
                            urlPattern: /.*\.js.*/,
                            handler: 'StaleWhileRevalidate',
                            options: {
                                cacheName: 'ego-js',
                                expiration: {
                                    maxEntries: 200, // 最多缓存30个，超过的按照LRU原则删除
                                    maxAgeSeconds: 30 * 24 * 60 * 60, // 缓存有效期，30天
                                },
                                cacheableResponse: {
                                    statuses: [200],
                                },
                            },
                        },
                        {
                            urlPattern: /.*\.css.*/,
                            handler: 'StaleWhileRevalidate',
                            options: {
                                cacheName: 'ego-css',
                                expiration: {
                                    maxEntries: 200,
                                    maxAgeSeconds: 30 * 24 * 60 * 60,
                                },
                                cacheableResponse: {
                                    statuses: [200],
                                },
                            },
                        },
                        {
                            urlPattern: /.*\.html.*/,
                            handler: 'StaleWhileRevalidate',
                            options: {
                                cacheName: 'ego-html',
                                expiration: {
                                    maxEntries: 30,
                                    maxAgeSeconds: 30 * 24 * 60 * 60,
                                },
                                cacheableResponse: {
                                    statuses: [200],
                                },
                            },
                        },
                    ],
                },
                devOptions: {
                    enabled: true,
                },
            }),
        ],
        server: {
            host: '0.0.0.0',
            // port: 5173,
            https: true,
            proxy: {
                '/dev-github-api': {
                    target: 'https://api.github.com',
                    changeOrigin: true, //支持跨域
                    rewrite: (path) => path.replace(/^\/dev-github-api/, ''), //重写路径,替换/api
                },
                '/dev-uomg-api': {
                    target: 'https://api.uomg.com',
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/dev-uomg-api/, ''),
                },
                //
            },
        },
        build: {
            // npm install terser -D
            // 生成环境去掉console日志和debugger断点
            // minify: 'terser',
            // terserOptions: {
            //     compress: {
            //         drop_console: true,
            //         drop_debugger: true,
            //     },
            // },
            chunkSizeWarningLimit: 1500,
            rollupOptions: {
                output: {
                    manualChunks(id) {
                        if (id.includes('node_modules')) {
                            return id.toString().split('node_modules/')[1].split('/')[0].toString();
                        }
                    },
                    chunkFileNames: (chunkInfo) => {
                        const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split('/') : [];
                        const fileName = facadeModuleId[facadeModuleId.length - 2] || '[name]';
                        return `js/${fileName}/[name].[hash].js`;
                    },
                },
            },
        },
    };
});
