// @ts-nocheck
import copy from "rollup-plugin-copy";
// @ts-nocheck
import { defineConfig } from "vite";

export default defineConfig({
  css: {
    devSourcemap: true,
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      input: "src/module.mjs",
      output: {
        dir: "dist/",
        entryFileNames:"scripts/module.js",
        assetFileNames: (assetInfo) => {
          const isImgType = assetInfo.names?.filter(n=>/\.(gif|jpe?g|png|svg)$/.test(n)).length > 0;
          const isStyleType = assetInfo.names?.filter(n=>/\.css$/.test(n)).length > 0;

          if (isImgType){
              return 'assets/images/[name][extname]';
          }
          if (isStyleType) {
            return 'styles/[name][extname]';   
          }
          if (assetInfo.originalFileNames?.includes("src/module.mjs")) {
            return "scripts/module.js";
          }

          return 'assets/[name][extname]';
        },
        format: "es",
      },
    },
  },
 plugins: [
  copy({
    targets: [
      { src: "src/module.json", dest: "dist" },
      { src: "src/templates", dest: "dist" }
    ],
    hook: "writeBundle",
  })
 ],
});