export interface ReportConfigurations {
  MaxDiffForSession: number; // maximum difference in minutes between commits counted to one session. Default: 120
  MinuetsToAddToFirstCommit: number; // how many minutes first commit of session should add to total. Default: 60
  DateFrom: Date; //Analyze data since certain date. [always|yesterday|tonight|lastweek|yyyy-mm-dd] Default: always'
  DateUntil: Date; // Analyze data until certain date. [always|yesterday|today|lastweek|thisweek|yyyy-mm-dd] Default: today
  Email: string; //  email address. Default: current git user email address
  PathToRepo: string; //  Git repository to analyze. Default: .
  outputFormat: "csv" | "console" | "all";
  outputFolder: string;
}

export interface CommandLineOption {
  name: string;
  alias: string;
  type: "boolean" | "string" | "number";
  configOption?: keyof ReportConfigurations | "Help";
  helpText: string;
}
