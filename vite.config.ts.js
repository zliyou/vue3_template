// vite.config.ts
import {
    fileURLToPath,
    URL
} from "node:url";
import {
    defineConfig
} from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import vueDevTools from "vite-plugin-vue-devtools";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import {
    VantResolver
} from "unplugin-vue-components/resolvers";
import tailwindcss from '@tailwindcss/vite'
var vite_config_default = defineConfig({
    plugins: [
        vue(),
        vueJsx(),
        vueDevTools(),
        tailwindcss(),
        AutoImport({
            include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/],
            imports: ["vue", "vue-router", "pinia"],
            dts: "src/auto-imports.d.ts"
        }),
        Components({
            dts: "src/components.d.ts",
            dirs: ["src/components"],
            resolvers: [VantResolver()]
        })
    ],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", "file://D:\\work\\Code\\so\\v3_quanzichou\\vue3_template\\vite.config.ts"))
        }
    }
});
export {
    vite_config_default as
    default
};