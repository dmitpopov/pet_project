const express = require('express');
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());


const ideasStorage = [
    {id: 1, name: 'test1', date: '30.09.2020', description: 'test1 text', favorite: false},
    {id: 2, name: 'test2', date: '30.09.2020', description: 'test2 text', favorite: true},
    {id: 3, name: 'test3', date: '30.09.2020', description: 'test3 text', favorite: true}
];

let idCounter = 3;

app.get('/', (req, res) => {
    res.send('server runs OK');
})

app.get('/main', (req, res) => {
    res.json(ideasStorage);
})

app.get('/idea/:id', (req, res) => {
    const id = req.params.id;
    res.json(ideasStorage[id]);
})


app.post('/create', (req, res) => {
    idCounter++;
    let a = {...req.body, id: idCounter};
    console.log(a);
    ideasStorage.push(a);
    console.log(ideasStorage);
    res.status(201).send('Запись успешно добавлена в базу данных');
})







app.listen(3030, () => {
    console.log('server runs at port 3030');
})

