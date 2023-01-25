import os from "os";
import {exec} from "child_process";

export const getGitLog = async () => {
    let lsCommand = `ls ${dir}/.git`;

    if (os.platform() === 'win32') {
        lsCommand = `dir ${dir}\\.git`;
    }
    return new Promise((resolve, reject) => {
        exec(lsCommand, function (err, data) {
            if (err) {
                throw new Error(`${dir} is not a valid Git directory`)
            }
            console.log(data)
            exec(`cd ${dir} && ${command}`, function (err, data) {
                if (err) {
                    throw new Error(`${dir} git log command failed ${err}`)
                }

                resolve(data);
            })
        })

    })


}
