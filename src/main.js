import { getGitLog } from './core/getGitLog.js';

export const main = async () => {
  try {
    const data = await getGitLog();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
};
