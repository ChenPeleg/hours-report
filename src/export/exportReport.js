import { buildCsvAsString } from "./buildCsvAsString.js";
import { saveToCsvOrXlsxFile } from "./saveToCsvOrXlsxFile.js";
import { exportReportToConsole } from "./exportReportToConsole.js";
import { logToConsole } from "../utils/logToConsole.js";
import { logger } from "../utils/logger.js";
import { openExplorerIn } from "../utils/open-explorer.js";

/**
 * @param {import("../types/Report.js").Report} report
 * @param {import("../types/reportConfigurations.js").ReportConfigurations} config
 */
export const exportReport = async (report, config) => {
  logger.info(
    `exportReport received a report with ${report.months.length} months data`
  );
  let fileLocation;
  const csv = buildCsvAsString(report);
  logToConsole(config.outputFormat);
  if (config.outputFormat === "console" || config.outputFormat === "all") {
    await exportReportToConsole(csv);
  }
  if (
    config.outputFormat === "csv" ||
    config.outputFormat === "all" ||
    config.outputFormat === "xlsx"
  ) {
    const saveFileResult = await saveToCsvOrXlsxFile(csv, config, report);
    fileLocation = saveFileResult.filePath;
    if (config.outputFormat === "xlsx") {
      fileLocation = fileLocation.replace("csv", "xlsx");
    }
    logToConsole(
      "\n\x1b[32m ✔ \x1b[0m",
      `Hours report exported successfully to: \n    file:///${fileLocation.replace(
        /\\/g,
        "/"
      )}`
    );
    setTimeout(() => openExplorerIn(saveFileResult.folderPath), 1000);
  }
  logger.info(
    "exportReport success",
    "format:",
    JSON.stringify(config),
    fileLocation ? "location: " + fileLocation : ""
  );
};
