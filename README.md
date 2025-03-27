# 开箱即用

## Vue3+Vite、TypeScript、Pinia，接口方面使用Axios配合@Tanstack/vue-query进行处理，预处理器Sass搭配Tailwindcss插件使用

- tips: Tailwindcss目前使用3.x版本，因为目前会有类名提示失效的问题。目前以保留4.x版本所需依赖，如此问题以改，可自行切换到4.x版本即可 (25-3-27 已解决，因为缺失了tailwind.config.js所以插件找不到配置导致的)
  `pnpm add tailwindcss@^4.0.0`

## Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Type-Check, Compile and Minify for Production

```sh
pnpm build
```
