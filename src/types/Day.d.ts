import { WorkSession } from './workSession.js';

export interface Day {
  workSessions: WorkSession[];
  dateAsNumber: number;
  comments: string;
  minuetSum: number;
}
