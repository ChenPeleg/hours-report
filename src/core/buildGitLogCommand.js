import { appConstants } from '../config/constants.js';

export const gitLogCommand = (dir, authors) =>
  `cd ${dir} && git log --pretty="%cd %ce %s ${appConstants.refsIndicator} %d" --graph --date=iso --date-order`;
