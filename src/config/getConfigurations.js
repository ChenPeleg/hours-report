import { ArgsOptionDictionary } from './argsOptionDictionary.js';
import { defaultConfig } from './defaultConfig.js';
import { getConfigurationsFromArgs } from './getConfigurationsFromArgs.js';

/**
 * @param {string[]} commandLineArgs
 * @return  {{config : import('../types/reportConfigurations.js').ReportConfigurations, help : boolean }} */
export const getConfiguration = (commandLineArgs) => {
  let help = false;
  const config = { ...defaultConfig };
  try {
    const commandLineArgsAsString = commandLineArgs.slice(2).join(' ');
    const configsFromArgs = getConfigurationsFromArgs(
      commandLineArgsAsString,
      ArgsOptionDictionary
    );
    for (let configProp of Object.keys(configsFromArgs)) {
      config[configProp] = configsFromArgs[configProp];
      if (configProp === 'Help') {
        help = true;
      }
    }
  } catch (err) {
    help = true;
    console.error(err);
  }
  return { config, help };
};
