import { existsSync, mkdirSync, writeFileSync } from "fs";
import path from "path";
import { tmpdir } from "os";
import { veryBasicHash } from "../utils/veryBasicHash.js";
import { exportLogs } from "./exportLogs.js";
import { exportToXls } from "../xlsx/index.js";
import { buildXlsxData } from "./buildXlsxData.js";

/**
 * @param {string} csvText
 * @param {import("../types/reportConfigurations.js").ReportConfigurations} config
 * @returns {Promise<{ filePath: string; folderPath: string }>}
 */
export const saveToCsvOrXlsxFile = async (csvText, config) => {
  const fileHash = veryBasicHash(csvText);
  const fileName = `hours-report-` + fileHash;
  const reportFolderPath = config.outputFolder
    ? path.resolve("./", config.outputFolder)
    : path.resolve(tmpdir(), `./hours-report-${fileHash}/`);
  const reportLogsFolderPath = path.resolve(reportFolderPath, "logs");
  if (!existsSync(reportFolderPath)) {
    mkdirSync(reportFolderPath);
  }
  if (!existsSync(reportLogsFolderPath)) {
    mkdirSync(reportLogsFolderPath);
  }
  const reportFilePath = path.resolve(reportFolderPath, `${fileName}.csv`);
  if (config.outputFormat === "xlsx") {
    const xlsxData = buildXlsxData(csvText);
    xlsxData.name = fileName;
    await exportToXls(
      xlsxData,
      path.resolve(tmpdir(), `./hours-report-temp-xls/`),
      reportFolderPath
    );
  } else if (config.outputFormat === "csv") {
    writeFileSync(reportFilePath, csvText);
  }

  exportLogs(reportLogsFolderPath);
  return { folderPath: reportFolderPath, filePath: reportFilePath };
};
