import typescript from "rollup-plugin-typescript2"
import resolve from "rollup-plugin-node-resolve"
import { terser } from "rollup-plugin-terser"
import json from "rollup-plugin-json"
import commonjs from "rollup-plugin-commonjs"
import builtins from 'rollup-plugin-node-builtins'


export default [
  {
    input: "index.ts",
    plugins: [ resolve(), builtins(), commonjs({ browser: true }), typescript(), terser(), json()],
    output: [
      {
        file: "dist/main.es.js",
        format: "esm",
        name: "main",
      },
      {
        file: "dist/main.mjs",
        format: "esm",
        name: "main",
      },
      {
        file: "dist/main.cjs",
        format: "cjs",
        name: "main",
      },
      {
        file: "dist/main.iife.js",
        format: "iife",
        name: "main",
      },
      {
        file: "dist/main.umd.js",
        format: "umd",
        name: "main",
      },
    ],
  },
]
