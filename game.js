const readline = require("readline");
const path = require('path');
const getRandom = require("./utils/getRandom");
const {argv} = require('yargs')(process.argv.slice(2))
    .option('filename', {
        alias: "f",
        type: "string"
    });
const logger = new (require('./utils/Logger'))(path.join(__dirname, 'logs', `${argv.filename || 'log'}.log`));

const input = readline.createInterface(process.stdin);
let question = getRandom(1, 2);
console.log("Отгадай число (1, 2)");

input.on("line", (str) => {
    const answer = parseInt(str);
    if(isNaN(answer)){
        console.log("Это не число!");
    } else if(![1, 2].includes(answer)){
        console.log("Только 1 или 2!");
    } else {
        if(answer !== question){
            console.log("Не угадал!");
            logger.log('bad');
        } else {
            console.log("Молодец!");
            logger.log('good');
        }
        question = question = getRandom(1, 2);
        console.log("А теперь еще раз!");
    }
})
