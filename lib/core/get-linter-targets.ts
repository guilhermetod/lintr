import micromatch from 'micromatch';

import { Linter } from '@lib/typings/linter';
import { Targets } from '@lib/typings/targets';
import { separateTargets } from '@lib/utils/separate-targets';

const applyLinterPatternFilter = (targets: string[], pattern?: string): string[] => (
  pattern
    ? micromatch(targets, pattern)
    : targets
);

export const getLinterTargets = (globalTargets: string[], linterConfig: Linter): Targets => {
  const { dirs, files } = separateTargets(globalTargets);

  return {
    dirs,
    files: applyLinterPatternFilter(files, linterConfig.pattern),
  };
};
