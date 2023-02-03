import { ArgsOptionDictionary } from './argsOptionDictionary.js';

const INDENT_TEXT = 20;

export const printHelpText = () => {
  const helpText = ` 
Usage: hours-report <options>

Where <options> are:

Options:
 
  `;

  const argsDescription = ArgsOptionDictionary.map((a) => {
    let argText = `   -${a.alias},  --${a.name} `;
    let text = ' '.repeat(INDENT_TEXT - argText.length) + 'fasdfasdfsa'; //a.helpText;
    return argText + text;
  });

  return helpText + argsDescription.join('\n');
};
