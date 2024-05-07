const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  dim: "\x1b[2m",
  underscore: "\x1b[4m",
  blink: "\x1b[5m",
  reverse: "\x1b[7m",
  hidden: "\x1b[8m",
  hideCursor: "\u001B[?25l",
  fg: {
    black: "\x1b[30m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m",
    white: "\x1b[37m",
  },
  bg: {
    BGblack: "\x1b[40m",
    BGred: "\x1b[41m",
    BGgreen: "\x1b[42m",
    BGyellow: "\x1b[43m",
    BGblue: "\x1b[44m",
    BGmagenta: "\x1b[45m",
    BGcyan: "\x1b[46m",
    BGwhite: "\x1b[47m",
  },
};
/**
 * @typedef {Object} logOptions
 * @property {keyof typeof colors.fg} color
 * @property {keyof typeof colors.bg} background
 */

export class TestRunnerLogger {
  /** @param {string[]} args */
  logToConsole(...args) {
    console["log"](...args);
  }

  /**
   * @param {Object} conclusions
   * @param {string} conclusions.todo
   * @param {string} conclusions.duration_ms
   * @param {string} conclusions.fail
   * @param {string} conclusions.tests
   * @param {string} conclusions.pass
   * @param {string} conclusions.cancelled
   * @param {string} conclusions.skipped
   */
  writeFinalResults = (conclusions) => {
    const { skipped, fail, pass } = conclusions;
    /**
     * @param {string} count
     * @param {string} status
     * @param {keyof typeof colors.bg} color
     */
    const logResult = (count, status, color) => {
      if (+count) {
        this.logToConsole(
          `${count} Tests ${this.paint(` ${status} `, {
            color: "white",
            background: color,
          })}`
        );
      }
    };

    logResult(skipped, "SKIPPED", "BGyellow");
    logResult(fail, "FAILED", "BGred");
    logResult(pass, "PASSED", "BGgreen");
  };

  /** @param {string[]} resultsAsText */
  getConclusions(resultsAsText) {
    const resultObjectRows = resultsAsText.map((r) => JSON.parse(r));

    const conclusions = {
      tests: "",
      pass: "",
      fail: "",
      cancelled: "",
      skipped: "",
      todo: "",
      duration_ms: "",
      allTests: [],
      allSuites: [],
    };

    function TestResults(type, name, file, status, nesting, line, error) {
      return {
        type,
        name,
        file,
        status,
        nesting,
        line,
        error,
      };
    }

    resultObjectRows.forEach((test) => {
      const type = test.type.replace("test:", "");
      if (test.data?.details?.type === "suite") {
        const suite = TestResults(
          "suite",
          test.data.name,
          test.data.file,
          type,
          test.data.nesting,
          test.data.line,
          test.data.error
        );
        conclusions.allSuites.push(suite);
        return;
      }
      switch (type) {
        case "pass":
          conclusions.pass = (+conclusions.pass + 1).toString();
          break;
        case "fail":
          conclusions.fail = (+conclusions.fail + 1).toString();
          break;
        case "skip":
          conclusions.skipped = (+conclusions.skipped + 1).toString();
          break;
        case "todo":
          conclusions.todo = (+conclusions.todo + 1).toString();
          break;
        default:
          return;
      }
      conclusions.allTests.push(
        TestResults(
          "test",
          test.data.name,
          test.data.file,
          type,
          test.data.nesting,
          test.data.line,
          test.data.details.error
        )
      );
    });

    return conclusions;
  }
  test_runner_logger(resultsAsStringedText) {
    try {
      const conclusionsObj = this.getConclusions(resultsAsStringedText);
      const files = [
        // @ts-ignore
        ...new Set([
          ...conclusionsObj.allSuites.map((s) => s.file),
          ...conclusionsObj.allTests.map((s) => s.file),
        ]),
      ];
      const rows = files.map((file) => {
        const tests = conclusionsObj.allTests.filter((t) => t.file === file);
        const suites = conclusionsObj.allSuites.filter((t) => t.file === file);
        const fileRow = this.paint(
          ` ${file
            .replace(/[\\/]+/g, "___")
            .split("___")
            .slice(-4)
            .join("/")}`,
          "cyan"
        );
        const innerRows = [...tests, ...suites]
          .sort((a, b) => (+a.line > +b.line ? 1 : -1))
          .map((t) => {
            let status =
              t.status === "pass"
                ? this.paint("✔", "green")
                : this.paint("✖", "red");
            if (t.type === "suite") {
              status = this.paint("▼", t.status === "pass" ? "cyan" : "red");
            }
            const name = t.name;
            const nesting = t.nesting;

            return `${"  ".repeat(+nesting)}   ${status} ${name} `;
          });

        return [fileRow, ...innerRows];
      });
      const errors = conclusionsObj.allTests.filter((t) => t.error);

      if (errors.length) {
        errors.forEach((err) => {
          const header = this.paint(`${err.file || ""}:${err.line}`, "red");
          const subHeader = this.paint(err.name, "red");

          this.logToConsole(
            `\n${this.paint(`${header} \n\n ${subHeader}`, "red")}`
          );
          this.logToConsole(err.error);
        });
      }
      this.logToConsole(rows.flat().join("\n"));
      this.writeFinalResults(conclusionsObj);
    } catch (err) {
      this.logToConsole(err);
    }
  }

  /**
   * @param {string} text
   * @param {logOptions | string} argsOptions
   * @returns {string}
   */
  paint(text, argsOptions) {
    const options =
      typeof argsOptions === "object"
        ? { ...argsOptions }
        : { color: argsOptions };

    const fg = options && options.color ? colors.fg[options.color] : "";
    const bg =
      // @ts-ignore
      options && options.background ? colors.bg[options.background] : "";
    const reset = colors.reset;
    return `${fg}${bg}${text}${reset}`;
  }
}
