import os from 'os';
import path from 'path';
import { execPromise } from '../utils/execPromise.js';
import { gitLogCommand } from './gitLogbuildLogCommand.js';
import { logger } from '../utils/logger.js';

const proccessDir = process.cwd();

const gitNameCommand = `git config --get remote.origin.url`;

/**
 * @param {import('../types/reportConfigurations.js').ReportConfigurations} config
 * @returns {Promise<{ gitLog: string; gitRepoName: string }>}
 */
export const gitLogGetLog = async (config) => {
  const dir = path.resolve(proccessDir, config.PathToRepo);
  let lsCommand = `ls ${dir}/.git`;

  if (os.platform() === 'win32') {
    lsCommand = `dir ${dir}\\.git`;
  }

  await execPromise(lsCommand).catch((err) => {
    throw `${dir} is not a valid Git directory. ${err}`;
  });

  if (!config.Email) {
    const userEmail = await execPromise(`git config --get user.email`);
    config.Email = userEmail;
  }
  const moreData = `--until=${
    config.DateUntil ||
    new Date().toLocaleDateString('en-GB', {
      dateStyle: 'short',
    })
  } ${config.DateFrom ? `--since=${config.DateFrom}` : ''}`;
  const gitLog = await execPromise(
    gitLogCommand(dir, config.Email, moreData)
  ).catch((err) => {
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
  logger.info(
    'git log get log',
    'repo: ',
    gitRepoName,
    'log length: ',
    gitLog.length
  );
  if (gitLog.length < 5) {
    const errMessage =
      'No git log entries found. Try changing the Email, dates and so etc.';
    logger.error(errMessage);
    throw errMessage;
  }

  return { gitLog, gitRepoName };
};
