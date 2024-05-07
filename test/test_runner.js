import { run } from "node:test";
import * as path from "path";
import fs from "node:fs";
import { TestRunnerLogger } from "./test_runner_logger.js";

class TestRunner {
  /**
   * @param {string[]} testFiles
   * @returns {Promise<{
   *   pass: boolean;
   *   passData: any;
   *   failData: any[];
   *   data: any[];
   * }>}
   */
  getTapDataAsync(testFiles) {
    const allData = [];

    let pass = true;
    return new Promise((resolve, reject) => {
      const stream = run({
        files: testFiles,
      });
      const passData = [];
      const failData = [];
      stream.on("data", (data) => allData.push(JSON.stringify(data, null, 2)));
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      stream.on("test:fail", (data) => {
        pass = false;
        failData.push(data);
      });
      stream.on("test:pass", (data) => {
        passData.push(data);
      });

      stream.on("close", () =>
        resolve({ pass, passData, failData, data: allData })
      );
      stream.on("error", (err) => reject(err));
    });
  }
  getTestFiles = async (dir) => {
    return Array.prototype.concat(
      ...(await Promise.all(
        (
          await fs.promises.readdir(dir, { withFileTypes: true })
        ).map((dirent) => {
          return dirent.isDirectory()
            ? this.getTestFiles(path.resolve(dir, dirent.name))
            : path.resolve(dir, dirent.name);
        })
      ))
    );
  };
  async testRunner(testType = "integration") {
    const testFilesPath = testType.includes("/")
      ? testType
      : `./test/${testType}`;

    try {
      const testFiles = (await this.getTestFiles(path.resolve(testFilesPath)))
        .filter((f) => f.includes("test.js"))
        .map((p) => path.resolve(testFilesPath, p));

      const result = await this.getTapDataAsync(testFiles);

      if (result) {
        new TestRunnerLogger().test_runner_logger(result.data);
        if (result.pass) {
          return true;
        }
      }
    } catch (err) {
      console.error(err);
    }
    process.exit(1);
  }
}

const testFolder = process.argv[2];
const runner = new TestRunner();
runner.testRunner(testFolder).then();
