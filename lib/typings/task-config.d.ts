import { Linter } from '@lib/typings/linter';
import { Targets } from '@lib/typings/targets';

export interface TaskConfig extends Linter {
  command: string;
  errorOnEmptyTarget: boolean;
  fix: boolean;
  matchedTargets: Targets;
  runAtRoot: boolean;
}
