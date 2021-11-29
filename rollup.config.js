import typescript from '@rollup/plugin-typescript';
import builtinModules from 'builtin-modules';
import del from 'rollup-plugin-delete';
import dts from 'rollup-plugin-dts';
import { preserveShebangs } from 'rollup-plugin-preserve-shebangs';

import { dependencies, types } from './package.json';
import { compilerOptions } from './tsconfig.build.json';

const external = [
  ...Object.keys(dependencies),
  ...builtinModules,
];

export default [
  {
    input: [
      'bin/lintr.ts',
      'lib/index.ts',
    ],
    external,
    output: {
      dir: 'dist',
      format: 'cjs',
      exports: 'named',
      preferConst: true,
      preserveModules: true,
      sourcemap: true,
    },
    plugins: [
      del({ targets: 'dist' }),
      typescript({ tsconfig: 'tsconfig.build.json' }),
      preserveShebangs(),
    ],
  },
  {
    input: 'lib/index.ts',
    output: {
      file: types,
    },
    plugins: [
      dts({ compilerOptions }),
    ],
  },
];
