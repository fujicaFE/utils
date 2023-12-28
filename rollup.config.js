import typescript from 'rollup-plugin-typescript2';
import resolve from 'rollup-plugin-node-resolve'
import { terser } from 'rollup-plugin-terser';

export default [
  {
    input: 'index.ts',
    plugins: [
      resolve(),
      typescript(),
      terser(),
    ],
    output: [
      {
        file: 'dist/main.es.js',
        format: 'es',
        name: 'main',
      },
      {
        file: 'dist/main.iife.js',
        format: 'iife',
        name: 'main',
      },
      {
        file: 'dist/main.umd.js',
        format: 'umd',
        name: 'main',
      },
    ],
  },
]