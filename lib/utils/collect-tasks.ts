import { Listr } from 'listr2';

export const collectTasks = (tasks: Listr['tasks']): Listr['tasks'] => tasks.reduce<Listr['tasks']>(
  (acc, task) => (
    task.subtasks
      ? [...acc, task, ...collectTasks(task.subtasks)]
      : [...acc, task]),
  [],
);
