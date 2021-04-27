import { exec } from 'child_process';

import { ListrRenderer, ListrTask, ListrTaskWrapper } from 'listr2';
import { Observable, Observer } from 'rxjs';

import { getGlobalTargets } from '@lib/core/get-global-targets';
import { getLinterTargets } from '@lib/core/get-linter-targets';
import { getLintersToRun } from '@lib/core/get-linters-to-run';
import { Linter } from '@lib/typings/linter';
import { RuntimeConfig } from '@lib/typings/runtime-config';
import { TaskConfig } from '@lib/typings/task-config';
import { buildTaskReportOutput } from '@lib/utils/build-task-report-output';
import { mergeTargets } from '@lib/utils/merge-targets';

const buildTaskConfig = (
  globalConfig: Required<RuntimeConfig>,
  globalTargets: string[],
  linterConfig: Linter,
): TaskConfig => {
  const { errorOnEmptyTarget, fix, useRoot, targets } = globalConfig;

  const runAtRoot = linterConfig.forceRoot
  || targets.length === 0
  || useRoot.includes(linterConfig.name);

  const matchedTargets = getLinterTargets(globalTargets, linterConfig);

  return { ...linterConfig, errorOnEmptyTarget, fix, matchedTargets, runAtRoot };
};

const hasTarget = (taskConfig: TaskConfig): boolean => (
  taskConfig.runAtRoot
  || mergeTargets(taskConfig.matchedTargets).length > 0
);

const buildCommandLine = (config: TaskConfig): string => {
  const { command, fix, fixFlag, matchedTargets, root = '', runAtRoot } = config;

  const fixArgument = fix && fixFlag ? fixFlag : '';
  const targetsArgument = runAtRoot ? root : mergeTargets(matchedTargets).join(' ').trim();

  return `${command} ${fixArgument} ${targetsArgument}`;
};

const reportAndRunCommandLine = (config: TaskConfig, observer: Observer<string | void>): void => {
  observer.next(buildTaskReportOutput(config));

  exec(buildCommandLine(config), (err, stdout, stderr) => (
    err
      ? observer.error(new Error(`${stdout}\n${stderr}`))
      : observer.complete()
  ));
};

const completeTaskWithNoTarget = (
  task: ListrTaskWrapper<null, typeof ListrRenderer>,
  observer: Observer<string | void>,
  taskConfig: TaskConfig,
): void => {
  const message = 'No targets matched for this linter';

  if (taskConfig.errorOnEmptyTarget) {
    observer.error(new Error(message));
  } else {
    task.skip(message);
  }

  observer.complete();
};

export const buildTasks = (runtimeConfig: Required<RuntimeConfig>): ListrTask[] => {
  const globalTargets = getGlobalTargets(runtimeConfig);

  return getLintersToRun(runtimeConfig).map((linter) => {
    const taskConfig = buildTaskConfig(runtimeConfig, globalTargets, linter);
    const { icon, name } = taskConfig;
    const title = runtimeConfig.useIcons && icon
      ? `${icon} ${name}`
      : name;

    return {
      title,
      task: (ctx, task): Observable<string | void> => new Observable((observer) => {
        if (hasTarget(taskConfig)) {
          reportAndRunCommandLine(taskConfig, observer);
        } else {
          completeTaskWithNoTarget(task, observer, taskConfig);
        }
      }),
    };
  });
};
