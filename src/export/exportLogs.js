import { buildCsvAsString } from "./buildCsvAsString.js";
import { saveToCsvFile } from "./saveToCsvFile.js";
import { exportReportToConsole } from "./exportReportToConsole.js";
import { logToConsole } from "../utils/logToConsole.js";
import { appendFileSync, existsSync, mkdirSync } from "fs";
import { logger } from "../utils/logger.js";
import path from "path";

/** @param {string} folder */
export const exportLogs = (folder) => {
  if (!existsSync(folder)) {
    mkdirSync(folder);
  }
  appendFileSync(
    path.resolve(
      folder,
      `hours-report-log-${new Date().getMilliseconds()}.log`
    ),
    logger.getLogs()
  );
};
