import os from 'os';
import { execPromise } from '../utils/execPromise.js';

const dir = process.cwd();

const command = `git log --pretty="%cd %ce %s" --graph --date=iso --date-order`;

/**
 * @returns {Promise<{gitLog: unknown, userEmail: unknown}>}
 */
export const getGitLog = async () => {
  let lsCommand = `ls ${dir}/.git`;

  if (os.platform() === 'win32') {
    lsCommand = `dir ${dir}\\.git`;
  }

  await execPromise(lsCommand).catch((err) => {
    throw `${dir} is not a valid Git directory`;
  });
  const gitLog = await execPromise(`cd ${dir} && ${command}`).catch((err) => {
    throw `git log command failed ${err}`;
  });

  const userEmail = await execPromise(`git config --get user.email`);
  return { gitLog, userEmail };
};
