import { resolve } from "node:path";
import { platform } from "node:os";
import { rename } from "node:fs/promises";
import { exec } from "child_process";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import fs from "node:fs";

export const deleteFilesFromDir = async (directory = "temp") => {
  const dir = resolve(directory);
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir);
};

export const execPromise = async (command, extraParams = {}) => {
  return new Promise(function (resolve, reject) {
    exec(command, extraParams, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(stdout.trim());
    });
  });
};

const renameFile = async (oldPath, newPath) => {
  const res = await rename(oldPath, newPath);
  return res;
};

/** @param {string} fileName */
/** @param {string} outDir */
export const runZipper = async (fileName = "workbook", outDir = "out") => {
  if (platform() === "win32") {
    const psCommand = `Compress-Archive -Path * -DestinationPath ${resolve(
      outDir
    )}/${fileName}.zip`;
    const res = await execPromise(psCommand, {
      cwd: "temp",
      shell: "powershell.exe",
    });
  } else {
    const psCommand = `cd ${resolve("temp")} && zip -r ${resolve(
      outDir
    )}/${fileName}.zip ./*`;
    const res = await execPromise(psCommand);
    console.log(res);
  }

  await renameFile(`${outDir}/${fileName}.zip`, `${outDir}/${fileName}.xlsx`);
};
/**
 * @param {Record<string, { url: string[]; content: string }>} fileObject
 * @param {any} tempDir
 */
export const copyFilesToTempDir = (fileObject, tempDir) => {
  for (const file in fileObject) {
    const dir = resolve(tempDir, ...fileObject[file].url.slice(0, -1));
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }
    writeFileSync(
      resolve(tempDir, ...fileObject[file].url),
      fileObject[file].content,
      { flag: "w", encoding: "utf8" }
    );
  }
};
