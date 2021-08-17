import { icons } from '@lib/presets/icons';
import { Linter } from '@lib/typings/linter';
import { joinArgs } from '@lib/utils/join-args';

export const cspell = (config: Partial<Linter> = {}): Linter => ({
  name: 'cSpell',
  icon: icons.cspell,
  command: joinArgs('cspell', ['--color', '--no-must-find-files', '--no-progress', '--no-summary']),
  root: '"**/*"',
  ...config,
});
