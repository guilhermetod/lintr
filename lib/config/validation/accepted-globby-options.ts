import { GlobbyOptions } from 'globby';

export const acceptedGlobbyOptions: ReadonlyArray<keyof GlobbyOptions> = [
  'absolute',
  'baseNameMatch',
  'braceExpansion',
  'caseSensitiveMatch',
  'cwd',
  'deep',
  'dot',
  'extglob',
  'followSymbolicLinks',
  'gitignore',
  'globstar',
  'markDirectories',
  'onlyDirectories',
  'onlyFiles',
  'unique',
];
