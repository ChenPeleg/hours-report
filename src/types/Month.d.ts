import { Day } from './Day.js';

export interface Month {
  year: number;
  MonthNumber: number;
  days: Day[];
  minuetSum: number;
  comments: string;
}
