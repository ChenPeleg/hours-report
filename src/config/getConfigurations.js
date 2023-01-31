import { ArgsOptionDictionary } from './argsOptionDictionary.js';
import { defaultConfig } from './defaultConfig.js';
import { getConfigurationsFromArgs } from './getConfigurationsFromArgs.js';

export const GetConfiguration = (args) => {
  const config = { ...defaultConfig };
  const configsFromArgs = getConfigurationsFromArgs(args, ArgsOptionDictionary);
  for (let configProp of Object.keys(configsFromArgs)) {
    config[configProp] = configsFromArgs[configProp];
  }
  return config;
};
