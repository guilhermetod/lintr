import { Targets } from '@lib/typings/targets';
import { concatenate } from '@lib/utils/concatenate';
import { resolvePlural } from '@lib/utils/resolve-plural';

export const stringifyTargets = (targets: Targets): string => {
  const { dirs, files } = targets;

  const dirsString = dirs.length > 0 ? `${dirs.length} ${resolvePlural(dirs.length, 'directory', 'directories')}` : '';
  const filesString = files.length > 0 ? `${files.length} ${resolvePlural(files.length, 'file')}` : '';

  return concatenate(dirsString, filesString);
};
