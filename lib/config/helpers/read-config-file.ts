import { cosmiconfig } from 'cosmiconfig';
import { CosmiconfigResult } from 'cosmiconfig/dist/types';

import { LintrConfig } from '@lib/typings/lintr-config';
import { exitWithError } from '@lib/utils/exit-with-error';

export const readConfigFile = async (configPath?: string | null): Promise<LintrConfig | never> => {
  const configExplorer = cosmiconfig('lintr');
  const message = 'could not find configuration file';

  const { config } = await (
    configPath
      ? configExplorer
        .load(configPath)
        .catch(() => exitWithError(`${message} (${configPath})`))
      : configExplorer
        .search()
        .then((configFile) => configFile ?? exitWithError(message))
  ) as NonNullable<CosmiconfigResult>;

  return config;
};
