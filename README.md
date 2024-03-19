# web-app-cloud

web应用，cloud - 网盘

public：该目录为纯静态文件，图片等放该目录后，打包构建时，vite不会做任何处理。构建为dist目录后，会全部直接复制到根目录下。所以引用时直接写/，根目录的方式直接引用即可。

## Depends

```shell
npm create vue@latest

npm install vue-router@4
npm install axios
npm install pinia
npm install vuetify
npm install @mdi/font -D
npm install sass -D

npm install echarts
npm install vue-echarts

npm install nprogress
# npm install pinia-plugin-persist
npm install pinia-plugin-persistedstate
```

```shell
# 安装package.json里面的所有依赖
# npm install --registry=https://registry.npm.taobao.org  # 已过期
npm install --registry=https://registry.npmmirror.com

# 其他npm镜像地址
https://npm.aliyun.com
https://mirrors.cloud.tencent.com/npm/
https://mirrors.huaweicloud.com/repository/npm/
https://mirrors.163.com/npm/
https://mirrors.tuna.tsinghua.edu.cn/

# 获取当前源地址
npm config get registry
# 临时设置源镜像地址
npm config set registry https://registry.npmmirror.com
# 永久设置源镜像地址
npm config set --global registry https://registry.npmmirror.com
# 切回官方源
npm config delete registry
```

## PWA

执行如下命令，指定logo文件和输出目录，可以生成各种尺寸的一套图标供pwa使用

```shell
npm install pwa-asset-generator
pwa-asset-generator [source-file] [output-folder]
npx pwa-asset-generator logo.png icons

workbox
```

## vite-plugin-pwa

插件官方文档 https://vite-pwa-org.netlify.app/
生成应用图标 https://realfavicongenerator.net/
使用vite的pwa插件，强大方便快捷，包括workbox等。配置后会自动生成dev-dist文件夹，及3个文件 registerSW.js sw.js workbox-xxx.js

```shell
npm install vite-plugin-pwa -D
npm install vite-plugin-mkcert -D

# 使用vite-plugin-mkcert就可以不再使用local-ssl-proxy
npm install local-ssl-proxy -g
local-ssl-proxy -s 9000 -t 5173
# 如果无法访问，使用如下命令
NODE_OPTIONS=--dns-result-order=ipv4first local-ssl-proxy -s 9000 -t 5173
```
