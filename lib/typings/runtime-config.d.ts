import { CLIConfig } from '@lib/typings/cli-config';
import { LintrConfig } from '@lib/typings/lintr-config';

export interface RuntimeConfig extends LintrConfig, CLIConfig {
  targets?: string[];
}
