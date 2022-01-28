import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import dts from 'rollup-plugin-dts';
//import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';

export default [
    {
        input: 'src/index.ts',
        output: [
            {
                file: pkg.main,
                format: 'cjs',
                exports: 'default',
                sourcemap: true,
            },
            {
                file: pkg.module,
                format: 'es',
                sourcemap: true,
            },
            {
                file: pkg.browser,
                name: 'SecureStorage',
                format: 'umd',
                sourcemap: true,
            },
        ],
        external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})],
        plugins: [
            resolve(),
            commonjs(),
            typescript({
                typescript: require('typescript'),
                useTsconfigDeclarationDir: true,
            }),
            commonjs({
                exclude: 'node_modules',
                ignoreGlobal: true,
            }),
            //terser(),
        ],
    },
    {
        input: './dist/dts/index.d.ts',
        output: [{ file: pkg.types, format: 'es' }],
        plugins: [dts()],
    },
];
