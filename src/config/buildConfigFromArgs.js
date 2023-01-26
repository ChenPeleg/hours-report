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
  for (let i = 0; i < args; i += 1) {

    for (let option of ArgsOption) {
      if (getArgumentFromArgs(args[i], args[i + 1], option)) {

      }
    }

  }
  return dataFromArgs;
};
