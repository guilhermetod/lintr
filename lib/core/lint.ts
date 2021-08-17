import { basename } from 'path';

import { Listr, ListrTaskResult } from 'listr2';

import { defaultRuntimeConfig } from '@lib/config/defaults/default-runtime-config';
import { validateConfig } from '@lib/config/validation/validate-config';
import { buildTasks } from '@lib/core/build-tasks';
import { exit } from '@lib/core/exit';
import { RuntimeConfig } from '@lib/typings/runtime-config';

const buildListr = (config: Required<RuntimeConfig>): Listr => new Listr(
  {
    title: `Linting project "${basename(process.cwd())}"`,
    task: (ctx, task): ListrTaskResult<void> => task.newListr(
      buildTasks(config),
      { exitOnError: config.exitOnError, concurrent: config.concurrent },
    ),
  },
  {
    rendererOptions: {
      collapse: false,
      collapseErrors: false,
      collapseSkips: false,
      formatOutput: 'wrap',
    },
  },
);

export const lint = async (config: RuntimeConfig): Promise<void> => {
  const normalizedConfig = { ...defaultRuntimeConfig, ...config };

  validateConfig(normalizedConfig);

  const listr = buildListr(normalizedConfig);

  return listr.run()
    .then(() => exit(listr))
    .catch((error) => exit(listr, error));
};
