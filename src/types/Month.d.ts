import { Day } from './Day.js';

export interface Month {
  MonthDate: Date;
  days: Day[];
  minuetSum: number;
  comments: string;
}
