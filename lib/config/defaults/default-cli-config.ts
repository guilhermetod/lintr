import { defaultRunLintrConfig } from '@lib/config/defaults/default-run-lintr-config';
import { CLIConfig } from '@lib/typings/cli-config';
import { DefaultOptions } from '@lib/typings/default-options';

export const defaultCLIConfig: DefaultOptions<CLIConfig> = {
  ...defaultRunLintrConfig,
  configPath: null,
  enable: [],
  disable: [],
};
