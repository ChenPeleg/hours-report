import { Day } from './Day.js';

export interface Month {
  MonthNumber: number;
  days: Day[];
  hoursSum: number;
}
