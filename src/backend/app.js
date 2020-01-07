const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PATCH, DELETE, OPTIONS, PUT');
    next();    
});

app.get('/api/list', (req,res,next) => {
    const todoArr = [
        {title: 'First todo', description: 'My description'},
        {title: 'Second todo', description: 'My description'},
        {title: 'Third todo', description: 'My description'}
    ];
    res.status(200).json({
        message: 'Todos fetched successfuly!',
        todos: todoArr
    });
});



module.exports = app;