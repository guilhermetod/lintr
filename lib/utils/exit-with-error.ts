import chalk from 'chalk';

export const exitWithError = (message: string): never => {
  // eslint-disable-next-line no-console
  console.error(`${chalk.red('Lintr error:')} ${message}`);
  process.exit(1);
};
