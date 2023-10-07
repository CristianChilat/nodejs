const express = require("express");
const bodyParser = require('body-parser');
const url = require('url');
const querystring = require('querystring');
const req = require("express/lib/request");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const port = 3000;

const numbers = []

const sortNumbers = (numbers) => {
    const sortedNumbers = numbers;
    console.log(sortedNumbers.length);
    for(let i = 0; i < sortedNumbers.length - 1; i++){
        for(let j = i + 1; j < sortedNumbers.length; j++){
            if(sortedNumbers[i] > sortedNumbers[j]){
                const t = sortedNumbers[i];
                sortedNumbers[i] = sortedNumbers[j];
                sortedNumbers[j] = t;
            }
        }
    }
    return sortedNumbers;
}



app.get('/', (request, response) => {
    response.send('hello world');
})

app.get('/numbers', (request, response) => {
    response.send(numbers)
})

app.get('/sorted-numbers', (request, response) => {
    const requestedNumbers = request.query.numbers.split(',').map(number => Number(number))
    response.send(sortNumbers(requestedNumbers))
})

app.get('/check-password', (request, response) => {
    const inputPassword = request.query.password;
    const inputUserName = request.query.userName;

    const accountPassword = '321';
    const accountName = 'User';

    if(inputPassword === accountPassword && inputUserName === accountName){
        response.send('Page started')
    } else{
        response.send('Wrong credentials!')
    }
})

app.listen(port, () => {
    console.log('Server running')
})
