import yargs from 'yargs';

import { CLIConfig } from '@lib/typings/cli-config';

export const cliOptions: Record<keyof CLIConfig, yargs.Options> = {
  concurrent: {
    description: 'Whether or not linters should be executed concurrently.',
    type: 'boolean',
  },
  configPath: {
    description: 'Path to the lintr config file. Use this to override the default search paths.',
    type: 'string',
  },
  disable: {
    description: 'Runs every linter except the ones specified. Cannot be mixed with "enable" option.',
    array: true,
    type: 'string',
  },
  enable: {
    description: 'Runs only the linters specified. Cannot be mixed with "disable" option.',
    array: true,
    type: 'string',
  },
  errorOnEmptyTarget: {
    description: 'Whether or not to throw an error when a linter is not configured to run on root and matches no target.',
    type: 'boolean',
  },
  exitOnError: {
    description: 'Whether or not to exit without finishing the remaining tasks after encountering the first error.',
    type: 'boolean',
  },
  ignorePatterns: {
    description: 'List of patterns to ignore, written in the same format of the .gitignore files.',
    array: true,
    type: 'string',
  },
  fix: {
    description: 'Applies the fixes to all options  that support it.',
    type: 'boolean',
  },
  useIcons: {
    description: 'Wether or not to use icons in the linter name',
    type: 'boolean',
  },
  useRoot: {
    description: 'List of linters to force execution on root instead of the targets passed as arguments.',
    array: true,
    type: 'string',
  },
} as const;
