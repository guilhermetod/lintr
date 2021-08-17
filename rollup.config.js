import typescript from '@rollup/plugin-typescript';
import builtinModules from 'builtin-modules';
import del from 'rollup-plugin-delete';
import { preserveShebangs } from 'rollup-plugin-preserve-shebangs';

import { dependencies } from './package.json';

const external = [
  ...Object.keys(dependencies),
  ...builtinModules,
];

export default {
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
};
