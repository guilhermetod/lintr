import { icons } from '@lib/presets/icons';
import { Linter } from '@lib/typings/linter';
import { exitWithError } from '@lib/utils/exit-with-error';
import { joinArgs } from '@lib/utils/join-args';

export interface TypescriptBuildPresetConfig extends Linter {
  build: true;
}

export interface TypeScriptProjectPresetConfig extends Linter {
  build?: false;
  project?: string;
}

export type TypeScriptPresetConfig = TypescriptBuildPresetConfig | TypeScriptProjectPresetConfig;

const isBuildConfig = (
  config: Partial<TypeScriptPresetConfig>,
): config is Partial<TypescriptBuildPresetConfig> => config.build === true;

const buildCommand = (config: Partial<TypeScriptPresetConfig>): string => {
  if (isBuildConfig(config)) {
    return joinArgs('tsc', ['-b']);
  }

  return joinArgs('tsc', ['--noEmit', config.project ? `-p ${config.project}` : '']);
};

const resolveForceRoot = (config: Partial<TypeScriptPresetConfig>): boolean | never => {
  if (!isBuildConfig(config)) {
    return config.build ?? false;
  }

  if ((config as Partial<TypeScriptProjectPresetConfig>).project) {
    exitWithError('preset typescript cannot mix options "build" and "project"');
  }

  if (config.forceRoot === false) {
    exitWithError('preset typescript cannot mix options "build: true" and "forceRoot: false"');
  }

  return true;
};

export const typescript = (config: Partial<TypeScriptPresetConfig> = {}): Linter => ({
  name: 'TypeScript',
  icon: icons.typescript,
  command: buildCommand(config),
  pattern: '*.ts',
  ...config,
  forceRoot: resolveForceRoot(config),
});
