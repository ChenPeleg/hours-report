import { getGitLog } from './utils/get-git-log.js';

export const main = async () => {
  try {
    const data = await getGitLog();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
};
