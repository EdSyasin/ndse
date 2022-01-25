const path = require("path");
const {argv} = require('yargs')(process.argv.slice(2))
    .option('filename', {
        alias: "f",
        type: "string"
    });
const logger = new (require('./utils/Logger'))(path.join(__dirname, 'logs', `${argv.filename || 'log'}.log`));

logger.getLog()
    .then(data => {
        const wins = data.filter(x => x.message === 'good').length;
        const loses = data.filter(x => x.message === 'bad').length;
        const allGames = wins + loses;

        console.log("Всего партий: ", allGames);
        console.log(`Выигранных партий: ${wins} (${wins / (allGames / 100)}%)`);
        console.log(`Проигранных партий: ${loses} (${loses / (allGames / 100)}%)`);
    })
    .catch(err => {
        console.log(err);
    })