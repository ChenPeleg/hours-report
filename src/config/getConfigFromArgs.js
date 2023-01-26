/**
 * @param {string}argument
 * @param {string}nextArg
 * @param {string } optionLiteral
 * @return { true  }
 */
const validateArgumentText = (argument, nextArg, optionLiteral) => {
  const restOfText = argument.replace(optionLiteral, '').trim();
  if (
    restOfText.length === 0 ||
    (restOfText.length > 2 && restOfText.startsWith('='))
  ) {
    return true;
  }
  throw Error(`bad argument or format${argument}`);
};

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
    validateArgumentText(
      argument,
      nextArg,
      isAlias ? `-${option.alias}` : `--${option.name}`
    );
    if (hasEqual) {
      const data = isAlias
        ? argument.replace(`-${option.alias}=`, '')
        : argument.replace(`--${option.name}=`, '');
      return {
        data,
        jumpNextArg: false,
      };
    } else {
      return {
        data: nextArg,
        jumpNextArg: true,
      };
    }
  }
  return null;
};

/**
 * @param {string} argsAsString
 * @param {CommandLineOption[]} ArgsOption
 */
export const getConfigFromArgs = (argsAsString, ArgsOption) => {
  const args = argsAsString.split(' ').filter((x) => x.trim());
  /** @type {Partial<ReportConfigurations>}  */
  let dataFromArgs = {};
  argsLoop: for (let i = 0; i < args.length; i += 1) {
    for (let option of ArgsOption) {
      const resArgument = getArgumentFromArgs(args[i], args[i + 1], option);

      if (resArgument) {
        dataFromArgs[option.configOption] = resArgument.data;
        if (option.type === 'number') {
          dataFromArgs[option.configOption] = +resArgument.data;
        }
        if (resArgument.jumpNextArg) {
          i++;
          continue argsLoop;
        } else {
          continue argsLoop;
        }
      }
    }
    throw new Error(`${args[i]} is not a legal command.`);
  }
  return dataFromArgs;
};
