import {exec} from "child_process";
import * as os from "os";

const dir = process.cwd()

const command = `git log --pretty="%cd %ce %s" --graph --date=iso --date-order`

export const main =(a)=> {
    let lsCommand = `ls ${dir}/.git`;

    if(os.platform() === 'win32'){
        lsCommand = `dir ${dir}\\.git`;
    }

    exec(lsCommand, function (err, data) {
        if (err) {
            console.log(`${dir} is not a valid Git directory`)
            return
        }
        console.log(data)
        exec(`cd ${dir} && ${command}`, function (err, data) {
            if (err) {
                console.log(err)
                return
            }
//
//     var log = data.split('\n')}
            console.log(data)
        })
    })

}
