import { appConstants } from "../config/constants.js";

export const gitLogCommand = (dir, email, moreData) =>
  `cd ${dir} && git log --pretty="%ad %ce %s ${
    appConstants.refsIndicator
  } %d" --date=iso --date-order --author=${email.trim()} ${moreData}`;
