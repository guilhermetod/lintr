import { Linter } from '@lib/typings/linter';
import { RunLintrConfig } from '@lib/typings/run-lintr-config';
import { TargetOptions } from '@lib/typings/target-options';

export interface LintrConfig extends RunLintrConfig {
  linters: Linter[];
  targetOptions?: TargetOptions;
}
