import os from 'os';
import { execPromise } from '../utils/execPromise.js';
import { gitLogCommand } from './buildGitLogCommand.js';

const dir = process.cwd();

const gitNameCommand = `git config --get remote.origin.url`;

/**@param {import('../types/reportConfigurations.js').ReportConfigurations}config
 * @returns {Promise<{gitLog: unknown, userEmail: unknown,  gitRepoName : string}>}
 */
export const gitLogGetLog = async (config) => {
  let lsCommand = `ls ${dir}/.git`;

  if (os.platform() === 'win32') {
    lsCommand = `dir ${dir}\\.git`;
  }

  await execPromise(lsCommand).catch((err) => {
    throw `${dir} is not a valid Git directory. ${err}`;
  });
  const gitLog = await execPromise(gitLogCommand(dir, [])).catch((err) => {
    throw `git log command failed ${err}`;
  });
  const gitRepoNameRaw = await execPromise(
    `cd ${dir} && ${gitNameCommand}`
  ).catch((err) => {
    throw `git log command failed ${err}`;
  });
  const gitRepoName = gitRepoNameRaw
    .split('/')
    .slice(-2)
    .join('/')
    .replace('.git', '');

  const userEmail = await execPromise(`git config --get user.email`);
  if (!config.Email) {
    config.Email = userEmail;
  }
  return { gitLog, userEmail, gitRepoName };
};
