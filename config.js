require('dotenv').config();

if(!process.env.WEATHERSTACK_TOKEN){
    console.error('Не задан ключ для апи (WEATHERSTACK_TOKEN)!');
    process.exit();
}

module.exports = {
    apiKey: process.env.WEATHERSTACK_TOKEN
}