import { defaultCLIConfig } from '@lib/config/defaults/default-cli-config';
import { defaultRunLintrConfig } from '@lib/config/defaults/default-run-lintr-config';
import { DefaultOptions } from '@lib/typings/default-options';
import { RuntimeConfig } from '@lib/typings/runtime-config';

export const defaultRuntimeConfig : DefaultOptions<RuntimeConfig> = {
  ...defaultRunLintrConfig,
  ...defaultCLIConfig,
  targets: [],
  targetOptions: { gitignore: true },
};
