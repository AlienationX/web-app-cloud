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
```

## PWA

执行如下命令，指定logo文件和输出目录，可以生成各种尺寸的一套图标供pwa使用

```shell
npm install pwa-asset-generator
pwa-asset-generator [source-file] [output-folder]
npx pwa-asset-generator logo.png icons

workbox
```
