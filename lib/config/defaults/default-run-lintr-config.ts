import { DefaultOptions } from '@lib/typings/default-options';
import { RunLintrConfig } from '@lib/typings/run-lintr-config';

export const defaultRunLintrConfig: Readonly<DefaultOptions<RunLintrConfig>> = {
  concurrent: true,
  errorOnEmptyTarget: true,
  exitOnError: false,
  fix: false,
  ignorePatterns: [],
  useIcons: false,
  useRoot: [],
};
