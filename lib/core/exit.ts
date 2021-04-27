import { Listr } from 'listr2';

import { collectTasks } from '@lib/utils/collect-tasks';

export function exit(listr: Listr): never | void;
export function exit(listr: Listr, error: Error): never;
export function exit(listr: Listr, error?: Error): never | void {
  if (collectTasks(listr.tasks).some((task) => task.hasFailed())) {
    process.exit(1);
  }

  if (error) {
    throw error;
  }
}
