import { DateAndTimeUtil } from "../utils/dateAndTime.js";

/**
 * Build the data of a single day that is shown on the table as one row
 *
 * @param {import("../types/Day.js").Day} day
 * @param {import("../types/reportConfigurations.js").ReportConfigurations} configuration
 * @returns {import("../types/Day.js").Day}
 */

const buildDayData = (day, configuration) => {
  const dayWithData = { ...day };
  dayWithData.dayDate = day.workSessions[0].startTime;
  dayWithData.minuetSum = day.workSessions
    .map((session) =>
      DateAndTimeUtil.getMinutesBetweenDates(
        session.startTime,
        session.finishTime
      )
    )
    .reduce((a, b) => a + b, 0);
  const dayBranches = new Set();
  day.workSessions.forEach((s) => {
    s.branches.forEach((b) => dayBranches.add(b.trim()));
  });
  dayWithData.comments = Array.from(dayBranches)
    .filter((b) => b.trim())
    .join("; ");
  dayWithData.comments = dayWithData.comments.replace(/_/g, " ").trim();
  let commentsFromWorkSession = day.workSessions.map((ws) =>
    ws.gitComments.trim()
  );
  if (!dayWithData.comments) {
    if (configuration.priorityCommentPattern) {
      // sort text with priorityCommentPattern first in the array
      const priorityComments = commentsFromWorkSession.filter((c) =>
        c.includes(configuration.priorityCommentPattern)
      );
      if (priorityComments.length) {
        commentsFromWorkSession = commentsFromWorkSession.filter(
          (c) => !priorityComments.includes(c)
        );
        commentsFromWorkSession = [
          ...priorityComments,
          ...commentsFromWorkSession,
        ];
      }
    }
    dayWithData.comments = commentsFromWorkSession.join("; ");
  } else if (configuration.priorityCommentPattern) {
    const priorityComments = commentsFromWorkSession.filter((c) =>
      c.includes(configuration.priorityCommentPattern)
    );
    if (priorityComments.length) {
      dayWithData.comments = priorityComments.join("; ") + dayWithData.comments;
    }
  }
  return dayWithData;
};

/**
 * This builds the days shown in the report from work session
 *
 * @param {import("../types/workSession.js").WorkSession[]} workSessions
 * @param {import("../types/reportConfigurations.js").ReportConfigurations} configuration
 * @returns {import("../types/Day.js").Day[]}
 */
export const buildDaysFromSessions = (workSessions, configuration) => {
  /** @type {import("../types/Day.js").Day} */
  const EmptyDay = {
    workSessions: [],
    dayDate: new Date(),
    comments: "",
    minuetSum: 0,
  };
  /** @type {import("../types/Day.js").Day[]} */
  let allDays = [];
  /** @type {import("../types/Day.js").Day} */
  let CurrentDay = { ...EmptyDay, workSessions: [] };
  /** @type {import("../types/workSession.js").WorkSession} */
  let lastSession;
  for (let session of workSessions) {
    if (
      !lastSession ||
      DateAndTimeUtil.datesAreOnSameDay(
        lastSession ? lastSession.startTime : undefined,
        session.startTime
      )
    ) {
      CurrentDay.workSessions.push(session);
    } else if (lastSession) {
      allDays.push(CurrentDay);
      CurrentDay = { ...EmptyDay, workSessions: [] };
      CurrentDay.workSessions.push(session);
    }
    lastSession = session;
  }
  if (CurrentDay.workSessions.length) {
    allDays.push(CurrentDay);
  }

  return allDays.map((d) => buildDayData(d, configuration));
};
