import { icons } from '@lib/presets/icons';
import { Linter } from '@lib/typings/linter';
import { joinArgs } from '@lib/utils/join-args';

export const prettier = (config: Partial<Linter> = {}): Linter => ({
  name: 'Prettier',
  icon: icons.prettier,
  command: joinArgs('prettier', ['--color', '--check']),
  fixFlag: '--write',
  root: '.',
  ...config,
});
