import { icons } from '@lib/presets/icons';
import { Linter } from '@lib/typings/linter';
import { joinArgs } from '@lib/utils/join-args';

export const stylelint = (config: Partial<Linter> = {}): Linter => ({
  name: 'Stylelint',
  icon: icons.stylelint,
  command: joinArgs('stylelint', ['--color']),
  fixFlag: '--fix',
  root: '.',
  ...config,
});
