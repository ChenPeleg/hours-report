import { WorkSession } from "./workSession.js";

export interface Day {
  workSessions: WorkSession[];
  dayDate: Date;
  comments: string;
  minuetSum: number;
}
