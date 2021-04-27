import { Targets } from '@lib/typings/targets';

export const mergeTargets = ({ dirs, files }: Targets): string[] => [...dirs, ...files];
