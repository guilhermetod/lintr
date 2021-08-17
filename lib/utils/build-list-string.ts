import { resolvePlural } from '@lib/utils/resolve-plural';

export const buildListString = (
  list: unknown[],
  singular: string,
  plural?: string,
): string => `${resolvePlural(list.length, singular, plural)}: ${list.join(', ')}`;
