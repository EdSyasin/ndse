const config = require("./config");
const http = require("http");
const {argv} = require('yargs')(process.argv.slice(2))
    .option('c', {
        alias: "city",
    })
    .option('f', {
        alias: "forecast",
        type: 'boolean'
    })
const weatherStack = new (require("./WeatherStack"))(http, config.apiKey);

const city = argv.city || "moscow";

if(argv.forecast){
    weatherStack.getForecast(city)
        .then(data => {
            const result = {}
            for(const key in data.forecast){
                result[key] = {
                    "минимальная температура": data.forecast[key].mintemp,
                    "максимальная температура": data.forecast[key].maxtemp,
                }
            }
            console.table(result)
        })
        .catch(data => {
            console.log('error: ', data);
        })
} else {
    weatherStack.getCurrent(city)
        .then(data => {
            const result = {
                'время': data.observation_time,
                'температура': data.temperature,
                'скорость ветра': data.wind_speed,
                'давление': data.pressure
            }
            console.table(result);
        })
        .catch(data => {
            console.log('error: ', data);
        })
}





