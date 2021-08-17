#!/usr/bin/env node
import yargs from 'yargs';

import { defaultCLIConfig } from '@lib/config/defaults/default-cli-config';
import { cliOptions } from '@lib/config/helpers/cli-options';
import { readConfigFile } from '@lib/config/helpers/read-config-file';
import { lint } from '@lib/index';
import { CLIConfig } from '@lib/typings/cli-config';

const width = yargs.terminalWidth();

const args = yargs
  .usage('lintr [targets] [options]')
  .options(cliOptions)
  .wrap(width)
  .strictOptions()
  .argv as yargs.Arguments<CLIConfig>;

const targets = args._.map((n) => n.toString());

readConfigFile(args.configPath)
  .then((config) => lint({ ...defaultCLIConfig, ...config, ...args, targets }));
