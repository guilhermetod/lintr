import { icons } from '@lib/presets/icons';
import { Linter } from '@lib/typings/linter';

export const translocoKeys = (config: Partial<Linter> = {}): Linter => ({
  name: 'Transloco keys',
  icon: icons.translation,
  command: 'transloco-keys-manager find',
  fixFlag: '-a',
  forceRoot: true,
  ...config,
}); 
