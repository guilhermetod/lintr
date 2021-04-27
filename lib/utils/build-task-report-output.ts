import { TaskConfig } from '@lib/typings/task-config';
import { concatenate } from '@lib/utils/concatenate';
import { stringifyTargets } from '@lib/utils/stringify-targets';

const buildTargetsString = ({ runAtRoot, matchedTargets }: TaskConfig): string => (
  `Linting ${runAtRoot ? 'root directory' : stringifyTargets(matchedTargets)}`
);

const buildFixString = ({ fix, fixFlag }: TaskConfig): string => (fix && fixFlag ? 'applying fixes' : '');

export const buildTaskReportOutput = (config: TaskConfig): string => concatenate(
  buildTargetsString(config),
  buildFixString(config),
);
