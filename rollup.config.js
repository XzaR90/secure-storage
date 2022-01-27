import typescript from '@rollup/plugin-typescript';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

export default [
    {
        input: 'src/index.ts', // your entry point
        output: {
            name: 'SecureStorage', // package name
            file: 'dist/secure-storage.min.js',
            format: 'iife',
            sourcemap: true,
        },
        plugins: [resolve(), typescript({ tsconfig: './tsconfig.json' }), terser()],
    },
    {
        input: 'src/index.ts', // your entry point
        output: {
            name: pkg.name, // package name
            file: pkg.browser,
            format: 'umd',
            sourcemap: true,
        },
        plugins: [resolve(), commonjs(), typescript({ tsconfig: './tsconfig.json' }), terser()],
    },
    {
        input: 'src/index.ts', // your entry point
        output: [
            { file: pkg.main, format: 'cjs', exports: 'default', sourcemap: true },
            { file: pkg.module, format: 'es', exports: 'default', sourcemap: true },
        ],
        plugins: [typescript({ tsconfig: './tsconfig.json' }), terser()],
    },
];
