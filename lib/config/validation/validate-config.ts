import { acceptedGlobbyOptions } from '@lib/config/validation/accepted-globby-options';
import { RuntimeConfig } from '@lib/typings/runtime-config';
import { buildListString } from '@lib/utils/build-list-string';
import { getForbiddenValues } from '@lib/utils/contains-forbidden-value';
import { exitWithError } from '@lib/utils/exit-with-error';
import { getLintersByName } from '@lib/utils/get-linters-by-name';
import { normalizeLinterName } from '@lib/utils/normalize-linter-name';

const validateLinters = (config: Required<RuntimeConfig>): void | never => {
  if (!config.linters || config.linters.length === 0) {
    exitWithError('must specify at least one linter');
  }

  config.linters.forEach((linter) => {
    if (!linter.command) {
      exitWithError(`must specify command for linter "${linter.name}"`);
    }

    if (getLintersByName(config.linters, [linter.name]).length > 1) {
      exitWithError(`duplicate linter name "${linter.name}"`);
    }
  });
};

const validateLinterSpecification = (config: Required<RuntimeConfig>): void | never => {
  const { disable, enable, linters } = config;
  if (disable.length === 0 && enable.length === 0) {
    return;
  }

  if (disable.length > 0 && enable.length > 0) {
    exitWithError('cannot mix options "enable" and "disable"');
  }

  const validLinterNames = linters.map((linter) => normalizeLinterName(linter.name));
  const specifiedLinterNames = [...disable, ...enable].map(normalizeLinterName);
  const invalidLinterNames = specifiedLinterNames.filter((linterName) => !validLinterNames.includes(linterName));

  if (invalidLinterNames.length > 0) {
    exitWithError(`invalid specified ${buildListString(invalidLinterNames, 'linter')}`);
  }
};

const validateTargetOptions = (config: Required<RuntimeConfig>): void | never => {
  const targetOptionsKeys = config.targetOptions && Object.keys(config.targetOptions);
  const forbiddenValues = targetOptionsKeys && getForbiddenValues(
    targetOptionsKeys,
    acceptedGlobbyOptions as string[],
  );

  if (forbiddenValues?.length) {
    exitWithError(`invalid targetOptions ${buildListString(forbiddenValues, 'key')}`);
  }
};

export const validateConfig = async (config: Required<RuntimeConfig>): Promise<void | never> => {
  validateLinters(config);
  validateLinterSpecification(config);
  validateTargetOptions(config);
};
