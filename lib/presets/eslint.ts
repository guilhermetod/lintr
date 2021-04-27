import { icons } from '@lib/presets/icons';
import { Linter } from '@lib/typings/linter';
import { joinArgs } from '@lib/utils/join-args';

export const eslint = (config: Partial<Linter> = {}): Linter => ({
  name: 'ESLint',
  icon: icons.eslint,
  command: joinArgs('eslint', ['--color']),
  fixFlag: '--fix',
  root: '.',
  ...config,
});
