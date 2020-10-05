const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '901#Dm?2020&',
    database: 'ideas'
})


let ideasStorage = [
    {id: 1, name: 'test1', date: '30.09.2020', description: 'test1 text', favorite: false},
    {id: 2, name: 'test2', date: '30.09.2020', description: 'test2 text', favorite: true},
    {id: 3, name: 'test3', date: '30.09.2020', description: 'test3 text', favorite: true}
];

let idCounter = 3;

let loginQuery = `SELECT * FROM users WHERE name = `;
let ideaQuery = `SELECT * FROM ideas WHERE id = `;
let allIdeasList = `SELECT * FROM ideas WHERE id = `;

app.post('/', (req, res) => {
    const name = '"' + req.body.login + '"';
    console.log(typeof name);
    connection.query(loginQuery + name + ';', (err, data) => {
        if (!err) {
            console.log(data);
            res.send(data);
        } else {
            console.log(err);
            res.send(null);
        }
    })


    // res.send({'answer': 'OK'});
})

app.get('/main', (req, res) => {
    res.json(ideasStorage);
})

app.get('/idea/:id', (req, res) => {
    const id = +req.params.id;
    connection.query(ideaQuery+id+';', (err, data) => {
        // console.log((ideaQuery + id + ';'));
        if(!err) {
            console.log(data);
            res.json(data);
        } else {
            res.json(err);
        }
    })
    // const idea = ideasStorage.find((item) => {
    //     return item.id === id;
    // })
    // res.json(idea);
})

app.delete('/idea/:id', (req, res) => {
    const id = +req.params.id;
    ideasStorage = ideasStorage.filter((item) => {
        return item.id !== id;
    });
    res.status(201).send(ideasStorage);
})


app.post('/create', (req, res) => {
    idCounter++;
    let newIdea = {...req.body, id: idCounter};
    ideasStorage.push(newIdea);
    res.status(201).send('Запись успешно добавлена в базу данных');
})



app.listen(3030, () => {
    console.log('server runs at port 3030');
})

