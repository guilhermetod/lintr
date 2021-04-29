import { Listr } from 'listr2';

import { collectTasks } from '@lib/utils/collect-tasks';
import { exitWithError } from '@lib/utils/exit-with-error';

export function exit(listr: Listr): never | void;
export function exit(listr: Listr, error: Error): never;
export function exit(listr: Listr, error?: Error): never | void {
  if (collectTasks(listr.tasks).some((task) => task.hasFailed())) {
    process.exit(1);
  }

  if (error) {
    exitWithError(error.message);
  }
}
