const fs = require("fs");
const path = require('path');

class Logger {
    /**
     *
     * @param logFilePath путь до файла для логгирования
     */
    constructor(logFilePath) {
        this.logFilePath = logFilePath;
    }

    log(message){
        const logMessage = `[${(new Date).toISOString()}] ${message}${require('os').EOL}`;
        fs.appendFile(this.logFilePath, logMessage, (err => {
            if(err && err.errno === -2){
                const dirName = path.dirname(this.logFilePath);
                fs.mkdir(dirName, {recursive: true}, err1 => {
                    if(err1) {
                        console.log(err1);
                    }
                    this.log(message);
                });
            }
        }));
    }
}

module.exports = Logger;