import { ArgsOptionDictionary } from './argsOptionDictionary.js';
import { defaultConfig } from './defaultConfig.js';
import { getConfigurationsFromArgs } from './getConfigurationsFromArgs.js';

export const GetConfiguration = (commandLineArgs) => {
  const config = { ...defaultConfig };
  const commandLineArgsAsString = process.argv.slice(2).join(' ');

  const configsFromArgs = getConfigurationsFromArgs(
    commandLineArgsAsString,
    ArgsOptionDictionary
  );
  for (let configProp of Object.keys(configsFromArgs)) {
    config[configProp] = configsFromArgs[configProp];
  }
  return config;
};
