import { main } from "./core/xlsx-main.js";
import path from "path";
import { tmpdir } from "os";

/**
 * @param {import("./types/worksheet.types.js").Workbook} data
 * @param {string} tempDir
 * @param {string} outDir
 * @returns {Promise<void>}
 */
export const exportToXls = async (data, tempDir, outDir) => {
  return await main(null, { tempDir: tempDir, outDir: outDir });
};
// const tempDir = path.resolve(`output`, "temp");
// console.log(tempDir);
//
// exportToXls(
//   { name: "empty", sheets: [] },
//   tempDir,
//   path.resolve("output")
// ).then((r) => r);

async function example() {
  const tempDir = path.resolve(`output`, "temp");
  await main({ name: "empty", sheets: [] }, { tempDir: "temp", outDir: "out" });
  console.log("success!");
}

example();
