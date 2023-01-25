import {exec} from "child_process";
import * as os from "os";
import {getGitLog} from "./utils/get-git-log.js";

const dir = process.cwd()

const command = `git log --pretty="%cd %ce %s" --graph --date=iso --date-order`

export const main = async () => {
    try {
        const data = await getGitLog();
    } catch (err) {
        console.error(err)
    }

}
