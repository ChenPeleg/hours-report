/**
 * @type {CommandLineOption[]}
 */
export const ArgsOption = [
  {
    name: 'email',
    alias: 'e',
    type: 'string',
    configOption: 'Email',
  },
  {
    name: 'max-diff-for-session',
    alias: 'mx',
    type: 'number',
    configOption: 'MaxDiffForSession',
  },
  {
    name: 'min-session',
    alias: 'mn',
    type: 'number',
    configOption: 'MinimumSessionMinuets',
  },
  {
    name: 'date-from',
    alias: 'df',
    type: 'number',
    configOption: 'DateFrom',
  },
  {
    name: 'date-until',
    alias: 'du',
    type: 'number',
    configOption: 'DateUntil',
  },
  {
    name: 'output',
    alias: 'o',
    type: 'string',
    configOption: 'output',
  },
  {
    name: 'path',
    alias: 'p',
    type: 'string',
    configOption: 'PathToRepo',
  },
];
