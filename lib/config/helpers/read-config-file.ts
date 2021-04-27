import { cosmiconfig } from 'cosmiconfig';

import { LintrConfig } from '@lib/typings/lintr-config';
import { exitWithError } from '@lib/utils/exit-with-error';

export const readConfigFile = async (configPath?: string | null): Promise<LintrConfig> => {
  const configExplorer = cosmiconfig('lintr');

  const configFile = await (
    configPath
      ? configExplorer.load(configPath)
      : configExplorer.search()
  );

  const { config } = configFile ?? {};

  if (!config) {
    exitWithError('could not find configuration file');
  }

  return config;
};
