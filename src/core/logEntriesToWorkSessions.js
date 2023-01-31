import {DateAndTimeUtil} from '../utils/dateAndTime.js';

/**
 * @param {import("../types/gitLogEntry.js").GitLogEntry[] } logEntries
 * @param { number } maxDiffForSession
 * @return {{logEntries: import('../types/gitLogEntry.js').GitLogEntry[]}[]}
 */
const groupEntriesToSessions = (logEntries, maxDiffForSession) => {
    /** @type {{logEntries : import('../types/gitLogEntry.js').GitLogEntry[]}[]} */
    const basicSession = [];

    /** @type {import('../types/gitLogEntry.js').GitLogEntry} */
    let lastEntry;
    /** @type {{logEntries : import('../types/gitLogEntry.js').GitLogEntry[]}}*/
    let currentSession = {logEntries: []};
    for (let entry of logEntries) {
        if (lastEntry) {
            const diffFromLast = DateAndTimeUtil.getMinutesBetweenDates(
                lastEntry.date,
                entry.date
            );
            console.log(diffFromLast);
            if (diffFromLast < maxDiffForSession) {
                currentSession.logEntries.push(entry);
            } else {
                basicSession.push({...currentSession});
                currentSession = {logEntries: [entry]};
            }
        } else {
            currentSession.logEntries.push(entry);
        }
        lastEntry = entry;
    }
    basicSession.push(currentSession);
    return basicSession;
};

/**
 * @param {import("../types/gitLogEntry.js").GitLogEntry[] } logEntries
 * @param { number } maxDiffForSession
 * @return { import('../types/gitLogEntry.js').GitLogEntry[]}
 */
const buildWorkSessions = (logEntries, maxDiffForSession) => {
    return []
}

/**
 * @param {import("../types/gitLogEntry.js").GitLogEntry[] }logEntries
 * @param {import("../types/reportConfigurations.js").ReportConfigurations}config
 * @return {import("../types/workSession.js").WorkSession[]}
 */
export const LogEntriesToWorkSessions = (logEntries, config) => {
    /** @type {import("../types/workSession.js").WorkSession[]} */
    const workSessions = [];

    const sortedLogEntries = [...logEntries].sort(
        (a, b) => a.date.getTime() - b.date.getTime()
    );
    const basicSession = groupEntriesToSessions(
        sortedLogEntries,
        config.MaxDiffForSession
    );
    return workSessions;
};
