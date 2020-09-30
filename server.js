const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));


const ideasStorage = {};

app.get('/main', (req, res) => {
    res.json(ideasStorage).status(200).send('Запрос выполнен успешно');
})


app.post('/create', (req, res) => {
    ideasStorage.push(req.body);
    console.log(ideasStorage);
    res.status(201).send('Запись успешно добавлена в базу данных');
})







app.listen(3020, () => {
    console.log('server runs at port 3020');
})