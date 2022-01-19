#!/usr/bin/env node

const {argv} = require('yargs')(process.argv.slice(2))
    .option('y', {
        alias: "year",
    })
    .option('m', {
        alias: "month",
    })
    .option('d', {
        alias: "date",
    })
/**
 * @type {"current"|"add"|"sub"}
 */
const action = argv._[0] || "current";
let result = ''

Date.prototype.changeYear = function(years){
    this.setFullYear((new Date).getFullYear() + years);
}
Date.prototype.changeMonth = function(months){
    this.setMonth((new Date).getMonth() + months);
}
Date.prototype.changeDate = function(date){
    this.setDate((new Date).getDate() + date);
}

const date = new Date();

switch(action){
    case "current":
        if(argv.year){
            result = date.getFullYear();
        } else if(argv.month){
            result = date.getMonth() + 1;
        } else if(argv.date){
            result = date.getDate();
        } else {
            result = date.toISOString();
        }
        break;
    case "add":
        changeDate('add')
        result = date.toISOString();
        break;
    case "sub":
        changeDate('delete')
        result = date.toISOString();
        break;
}

function changeDate(action = "add"){
    if(argv.year && typeof argv.year === "number"){
        const years = Number(argv.year);
        date.changeYear( action === "add" ? years : -years);
    } else if(argv.month && typeof argv.month === "number"){
        const months = Number(argv.month);
        date.changeMonth(action === "add" ? months : -months);
    } else if(argv.date && typeof argv.date === "number"){
        const days = Number(argv.date);
        date.changeDate(action === "add" ? days : -days);
    } else {
        process.exit();
    }
}

console.log(result);