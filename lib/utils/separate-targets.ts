import { statSync } from 'fs';

import { Targets } from '@lib/typings/targets';

export const separateTargets = (targets: string[]): Targets => targets.reduce<Targets>((acc, target) => (
  statSync(target).isDirectory()
    ? { ...acc, dirs: [...acc.dirs, target] }
    : { ...acc, files: [...acc.files, target] }
), { dirs: [], files: [] });
