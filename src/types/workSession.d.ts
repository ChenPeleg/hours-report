import { GitLogEntry } from './gitLogEntry.js';

export interface WorkSession {
  startTime: Date;
  finishTime: Date;
  logEntries: GitLogEntry[];
  gitComments: string;
  otherComments: string;
}
