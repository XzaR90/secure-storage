import { DEFAULT_EXTENSIONS } from '@babel/core';
import typescript from '@rollup/plugin-typescript';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

const babelConfig = {
    exclude: ['node_modules/**'],
    extensions: [...DEFAULT_EXTENSIONS, '.ts'],
};

export default [
    {
        input: 'src/index.ts', // your entry point
        output: {
            name: 'SecureStorage', // package name
            file: 'dist/securestorage.min.js',
            format: 'iife',
        },
        plugins: [resolve(), typescript({ declaration: true }), babel(babelConfig), terser()],
    },
    {
        input: 'src/index.ts', // your entry point
        output: {
            name: pkg.name, // package name
            file: pkg.browser,
            format: 'umd',
        },
        plugins: [resolve(), commonjs(), typescript({ declaration: true }), babel(babelConfig), terser()],
    },
    {
        input: 'src/index.ts', // your entry point
        output: [
            { file: pkg.main, format: 'cjs' },
            { file: pkg.module, format: 'es' },
        ],
        plugins: [typescript({ declaration: true }), babel(babelConfig), terser()],
    },
];
