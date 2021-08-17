import { Linter } from '@lib/typings/linter';
import { normalizeLinterName } from '@lib/utils/normalize-linter-name';

export const filterLintersByName = (
  linters: Linter[],
  linterNames: string[],
): Linter[] => {
  const normalizedLinterNames = linterNames.map(normalizeLinterName);

  return linters.filter((linter) => !normalizedLinterNames.includes(normalizeLinterName(linter.name)));
};
