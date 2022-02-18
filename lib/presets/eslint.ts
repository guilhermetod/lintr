import { icons } from '@lib/presets/icons';
import { Linter } from '@lib/typings/linter';
import { joinArgs } from '@lib/utils/join-args';

export interface ESLintPresetConfig extends Linter {
  maxWarnings?: number;
}

const buildCommand = (config: Partial<ESLintPresetConfig>): string => (
  joinArgs('eslint', [
    '--color',
    typeof config.maxWarnings === 'number' ? `--max-warnings ${config.maxWarnings}` : '',
  ])
);

export const eslint = (config: Partial<ESLintPresetConfig> = {}): Linter => ({
  name: 'ESLint',
  icon: icons.eslint,
  command: buildCommand(config),
  fixFlag: '--fix',
  root: '.',
  ...config,
});
