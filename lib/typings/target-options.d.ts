import { GlobbyOptions } from 'globby';

import { acceptedGlobbyOptions } from '@lib/config/validation/accepted-globby-options';

export type TargetOptions = Pick<GlobbyOptions, typeof acceptedGlobbyOptions[number]>;
