import { ArgsOptionDictionary } from "./argsOptionDictionary.js";
import { logToConsole } from "../utils/logToConsole.js";

const INDENT_TEXT = 40;

export const printHelpText = () => {
  const helpText = ` 
Usage: hours-report <options>

Options:
`;

  const argsDescription = ArgsOptionDictionary.map((a) => {
    let argText = `   -${a.alias},${" ".repeat(2 - a.alias.length)}  --${
      a.name
    } `;
    let text = " ".repeat(INDENT_TEXT - argText.length) + a.helpText;
    return argText + text;
  });

  logToConsole(helpText + argsDescription.join("\n"));
};
