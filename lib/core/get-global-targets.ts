import { relative } from 'path';

import globby from 'globby';
import ignore from 'ignore';
import slash from 'slash';

import { RuntimeConfig } from '@lib/typings/runtime-config';

const applyIgnorePatterns = (targets: string[], ignorePatterns: string[]): string[] => {
  const fixedIgnorePatterns = ['**/node_modules/**', '**/.git/**'];
  const relativeTargets = targets.map((target) => relative(process.cwd(), target));

  return ignore().add([...fixedIgnorePatterns, ...ignorePatterns]).filter(relativeTargets);
};

export const getGlobalTargets = (globalConfig: Required<RuntimeConfig>): string[] => {
  const { ignorePatterns, targets, targetOptions } = globalConfig;

  const globbedTargets = globby.sync(targets.map(slash), targetOptions);
  return applyIgnorePatterns(globbedTargets, ignorePatterns);
};
