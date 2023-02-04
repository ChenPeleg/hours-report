import { log } from 'util';

const logs = [];

export const logger = {
  info(...args) {
    logs.push([new Date().toString(), 'Info', ...args]);
  },
  error(...args) {
    logs.push([new Date().toString(), 'Error', ...args]);
  },
  getLogs() {
    return logs.map((log) =>
      log
        .map((logParts) =>
          logParts.toString().replace(/\n/g, ' ').join('     ')
        )
        .join('\n')
    );
  },
};
