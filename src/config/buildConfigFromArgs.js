/**
 * @param {string}argument
 * @param {string}nextArg
 * @param {CommandLineOption } option
 * @return { null | {data : string, jumpNextArg: boolean}}
 */
const getArgumentFromArgs = (argument, nextArg, option) => {

  if (
      argument.startsWith(`-${option.alias}`) ||
      argument.startsWith(`--${option.name}`)
  ) {
    const isAlias = argument.startsWith(`-${option.alias}`);
    const hasEqual = argument.includes('=');
    if (hasEqual) {
      const data = isAlias
          ? argument.replace(`-${option.alias}=`)
          : argument.replace(`--${option.name}=`);
      return {
        data, jumpNextArg: false
      }
    } else {
      return {
        data: nextArg, jumpNextArg: true
      }

    }

  }
  return null

}


/**
 * @param {any}args
 * @param {CommandLineOption[]} ArgsOption
 */
export const buildConfigFromArgs = (args, ArgsOption) => {
  /**
   * @type {Partial<ReportConfigurations>}
   */
  let dataFromArgs = {};
  argsLoop:
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
              dataFromArgs[option.configOption] = isAlias
                  ? argument.replace(`-${option.alias}=`)
                  : argument.replace(`--${option.name}=`);
            } else {
              dataFromArgs[option.configOption] = args[i];
              i++;

            }
            continue argsLoop;
          }
        });
      }
  return dataFromArgs;
};
