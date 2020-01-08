const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Todo = require('../backend/models/todo');

const app = express();

mongoose.connect("mongodb+srv://admin:admin123@cluster0-fy6x7.mongodb.net/todo?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {console.log('Connected to the database!')})
    .catch((err) => {console.log(err)});

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PATCH, DELETE, OPTIONS, PUT');
    next();    
});

app.get('/api/list', (req,res,next) => {
    Todo.find()
        .then(dbdata => {
            res.status(200).json({
                message: 'Todos fetched successfuly!',
                todos: dbdata
            });
        })
        .catch(err => console.error(err));

});

app.post('/api/list', (req, res, next) => {
    const todo = new Todo({
        title: req.body.title,
        description: req.body.description
    });
    todo.save()
    .then(createdTodo => {
        console.log('New Todo added!');
        res.status(201).json({
            message: "Todo added!",
            newTodo: createdTodo
        });
    });
});

app.delete('/api/list/:id', (req, res, next) => {
     Todo.deleteOne({ _id: req.params.id})
         .then(() => {
             console.log('Todo has been deleted!');
             res.status(200).json({
                 message: 'Todo deleted!'
             });
         })
         .catch(err => console.error(err));
});


module.exports = app;