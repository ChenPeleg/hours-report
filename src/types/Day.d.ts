import { WorkSession } from './workSession.js';

export interface Day {
  workSessions: WorkSession[];
  dayNumber: number;
  comments: string;
  hoursSum: number;
}
