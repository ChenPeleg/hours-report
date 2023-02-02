import { WorkSession } from './workSession.js';

export interface Day {
  workSessions: WorkSession[];
  dayNumber: number;
  summary: number;
}
