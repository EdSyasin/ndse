const fs = require("fs");
const path = require('path');

class Logger {
    /**
     *
     *
     * @param logFilePath путь до файла для логгирования
     */
    constructor(logFilePath) {
        this.logFilePath = logFilePath;
    }

    log(message){
        const logMessage = `[${(new Date).toISOString()}] ${message}${require('os').EOL}`;
        fs.appendFile(this.logFilePath, logMessage, err => {
            if(err && err.errno === -2){
                const dirName = path.dirname(this.logFilePath);
                fs.mkdir(dirName, {recursive: true}, err1 => {
                    if(err1) {
                        console.log(err1);
                    }
                    this.log(message);
                });
            }
        });
    }

    getLog(){
        return new Promise(((resolve, reject) => {
            const rs = fs.createReadStream(this.logFilePath);
            rs.setEncoding('utf8');
            let sourceData = '';
            rs.on('data', chunk => {
                sourceData += chunk;
            })
            rs.on('end',  () => {
                resolve(this.#parseLog(sourceData));
            })
            rs.on("error", err => {
                reject(err)
            })
        }))
    }

    #parseLog(logData){
        const re = /(?<date>\[\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)\])\s(?<message>(\S|\s)+)/;

        return logData.split(require('os').EOL)
            .map(line => {
                const match = line.match(re);
                return match?.groups;
            })
            .filter(x => x);
    }
}

module.exports = Logger;