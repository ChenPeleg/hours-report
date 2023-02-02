import { Month } from './Month.js';

export interface Report {
  months: Month[];
  minuetSum: number;
  repoName: string;
  userEmail: string;
}
