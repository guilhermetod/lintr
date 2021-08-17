import { Linter } from '@lib/typings/linter';
import { RuntimeConfig } from '@lib/typings/runtime-config';
import { filterLintersByName } from '@lib/utils/filter-linters-by-name';
import { getLintersByName } from '@lib/utils/get-linters-by-name';

export const getLintersToRun = (config: Required<RuntimeConfig>): Linter[] => {
  const { linters, disable, enable } = config;

  if (enable.length > 0) {
    return getLintersByName(linters, enable);
  }

  return disable.length > 0
    ? filterLintersByName(linters, disable)
    : linters;
};
