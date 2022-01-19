#!/usr/bin/env node
const rlp = require('readline');

function game(){
    return new Promise((resolve, reject) => {
        console.log("Отгадай число от 0 до 100");
        const input = rlp.createInterface(process.stdin);
        const number = Math.floor(Math.random() * 101);
        input.on('line', str => {
            if(isNaN(parseInt(str)) ){
                console.log("Не число")
            } else if(Number(str) > number){
                console.log("Меньше!")
            } else if(Number(str) < number){
                console.log("Больше!")
            } else if(Number(str) === number){
                input.close();
                resolve(number);
            }
        })

    })
}

game()
    .then(number => {
        console.log(`молодец, число было ${number}!`);
    })