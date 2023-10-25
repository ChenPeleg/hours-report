import os from "os";
import path from "path";
import { execPromise } from "../utils/execPromise.js";
import { gitLogCommand } from "./gitLogbuildLogCommand.js";
import { logger } from "../utils/logger.js";

const proccessDir = process.cwd();

const gitNameCommand = `git config --get remote.origin.url`;

/**
 * @param {import("../types/reportConfigurations.js").ReportConfigurations} config
 * @returns {Promise<{ gitLog: string; gitRepoName: string }>}
 */
export const gitLogGetLog = async (config) => {
  logger.info("gitLogGetLog started");
  const dir = path.resolve(proccessDir, config.PathToRepo);
  logger.info(`gitLogGetLog: ${dir}`);

  let lsCommand = `ls ${dir}/.git`;

  if (os.platform() === "win32") {
    lsCommand = `dir ${dir}\\.git`;
  }
  await execPromise(lsCommand).catch((err) => {
    throw `${dir} is not a valid Git directory. ${err}`;
  });

  if (!config.Email) {
    const userEmail = await execPromise(`git config --get user.email`);
    config.Email = userEmail;
    logger.info(`user email form git config: ${userEmail}`);
  }
  const moreData = `--until=${
    config.DateUntil || new Date().getFullYear() + 1
  } ${config.DateFrom ? `--since=${config.DateFrom}` : ""}`;
  const gitLog = await execPromise(
    gitLogCommand(dir, config.Email, moreData)
  ).catch((err) => {
    throw `git log command failed ${err}`;
  });
  console.log(gitLogCommand(dir, config.Email, moreData));
  console.log("git log", gitLog);

  logger.info(`executed ${gitLogCommand(dir, config.Email, moreData)}`);
  const gitRepoNameRaw = await execPromise(
    `cd ${dir} && ${gitNameCommand}`
  ).catch((err) => {
    throw `git log command failed ${err}`;
  });
  const gitRepoName = gitRepoNameRaw
    .split("/")
    .slice(-2)
    .join("/")
    .replace(".git", "");
  logger.info(
    "git log get log",
    "repo: ",
    gitRepoName,
    "log length: ",
    gitLog.length
  );
  if (gitLog.length < 5) {
    const errMessage =
      "No git log entries found. Try changing the Email, dates and so etc.";
    logger.error(errMessage);
    throw errMessage;
  } else {
    logger.info(`Recieved git log. length: ${gitLog.length} chars`);
    logger.debug(`Recieved git log. all data: ${gitLog} chars`);
  }

  return { gitLog, gitRepoName };
};
