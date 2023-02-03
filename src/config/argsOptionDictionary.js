/**
 * @type {import("../types/reportConfigurations.js").CommandLineOption[]}
 */
export const ArgsOptionDictionary = [
  {
    name: 'email',
    alias: 'e',
    type: 'string',
    helpText: '',
    configOption: 'Email',
  },
  {
    name: 'max-diff-for-session',
    alias: 'mx',
    type: 'number',
    helpText: '',
    configOption: 'MaxDiffForSession',
  },
  {
    name: 'min-session',
    alias: 'mn',
    type: 'number',
    helpText: '',
    configOption: 'MinuetsToAddToFirstCommit',
  },
  {
    name: 'date-from',
    alias: 'df',
    type: 'number',
    helpText: '',
    configOption: 'DateFrom',
  },
  {
    name: 'date-until',
    alias: 'du',
    type: 'number',
    helpText: '',
    configOption: 'DateUntil',
  },
  {
    name: 'output',
    alias: 'o',
    type: 'string',
    helpText: '',
    configOption: 'output',
  },
  {
    name: 'path',
    alias: 'p',
    type: 'string',
    helpText: '',
    configOption: 'PathToRepo',
  },
];
