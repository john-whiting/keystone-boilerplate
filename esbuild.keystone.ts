import type { BuildOptions } from "esbuild";


const isProduction = process.env.NODE_ENV === "production";

export default function (defaultOptions: BuildOptions): BuildOptions {
  return {
    ...defaultOptions,
    entryPoints: [ "src/index.ts" ],
    treeShaking: true,
    minify: isProduction,
    sourcemap: !isProduction,
  };
}