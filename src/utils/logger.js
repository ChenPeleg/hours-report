const logs = [];

export const logger = {
  debug(...args) {
    logs.push([new Date().toISOString(), "Debug-Info", ...args]);
  },
  info(...args) {
    logs.push([new Date().toISOString(), "Info", ...args]);
  },
  error(...args) {
    logs.push([new Date().toISOString(), "Error", ...args]);
  },
  getLogs() {
    return logs
      .map((log) =>
        log
          .map((logParts) => logParts.toString().replace(/\n/g, " "))
          .join("     ")
      )
      .join("\n");
  },
};
