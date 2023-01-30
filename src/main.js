import { getGitLog } from './core/getGitLog.js';

export const main = async () => {
  try {
    return await getGitLog();
  } catch (err) {
    console.error(err);
  }
};
