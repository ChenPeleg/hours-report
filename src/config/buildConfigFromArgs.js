import {ArgsOption} from './argsOption.js';


/**
 * @param {any}args
 * @param {CommandLineOption[]} ArgsOption
 */
export const buildConfigFromArgs = (args, ArgsOption) => {

  for (let i = 0; i < args; i += 1) {
    let argument = args[i];
    ArgsOption.forEach((option) => {
      if (
          argument.startsWith(`-${option.alias}`) ||
          argument.startsWith(`--${option.name}`)
      ) {
        const isAlias = argument.startsWith(`-${option.alias}`);
        const hasEqual = argument.includes('=');
        if (hasEqual) {

        }
      }
    });
  }
};
