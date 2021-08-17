import { RunLintrConfig } from '@lib/typings/run-lintr-config';

export interface CLIConfig extends RunLintrConfig {
  configPath?: string | null;
  disable?: string[];
  enable?: string[];
}
