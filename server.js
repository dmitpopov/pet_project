const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql');
const nodemailer = require('nodemailer');
const cron = require('node-cron');
const bcrypt = require('bcrypt');
const randtoken = require('rand-token');
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


let loginQuery = `SELECT * FROM users WHERE name = `;
let ideaQuery = `SELECT * FROM ideas WHERE id = `;
let allIdeasListQuery = `SELECT * FROM ideas WHERE user_id = `;
let createIdeaQuery = `INSERT INTO ideas (user_id, idea_head, idea_text, date, favourite) VALUES (`;
let deleteIdeaQuery = `DELETE FROM ideas WHERE id = `;
let ideasForMessageQuery = `SELECT * FROM ideas WHERE TO_DAYS(NOW()) - TO_DAYS(date) <= 7;`;
let registrationQuery = `INSERT INTO users (name, surname, login, hashedpass, email, salt, token) VALUES (`;

let transporter = nodemailer.createTransport({
    host: "smtp.yandex.ru",
    port: 465,
    secure: true,
    auth: {
        user: 'bootmailer',
        pass: '20bootM20'
    }
})

const getMessagesToRemind = () => {
    connection.query(ideasForMessageQuery, (err, data) => {
        if(!err) {
            createEmail(data);
        } else {
            console.log(err);
        }
    });
}

const createEmail = (data) => {
    let newData = data;
    let ideasForReminder = '<h1><i>Список идей за прошедшую неделю</i></h1>';
    if(newData.length === 0) {
        ideasForReminder += 'Пока ничего нового';
    } else {
        newData.map((item) => {
            ideasForReminder += `<div>
                                <h2>${item.idea_head}</h2>
                                <a href="http://localhost:3000/idea/${item.id}">${item.idea_text}</a>
                            </div>`
            return ideasForReminder;
        })
    }
    transporter.sendMail({
        from: 'bootmailer@yandex.ru',
        to: 'dmpprog@gmail.com',
        subject: 'Ideas reminder',
        html: ideasForReminder
    })
}

// cron.schedule('*/1 * * * *', () => {
//     getMessagesToRemind();
// });

app.post('/reg', (req, res) => {

    const {name, surname, login, pass, email} = req.body;

    const salt = bcrypt.genSaltSync(20);
    const hashedPass = bcrypt.hashSync(pass, salt);
    const token = randtoken.generate(30);

    console.log(`${registrationQuery}${name}, ${surname}, ${login}, ${hashedPass}, ${email}, ${salt}, ${token});`);

    connection.query(`${registrationQuery}${name}, ${surname}, ${login}, ${hashedPass}, ${email}, ${salt}, ${token});`, (err, data) => {
        if(!err){
            res.status(200).send(token);
        } else {
            res.status(400).send();
        }
    })
})


app.post('/', (req, res) => {
    const name = '"' + req.body.login + '"';
    console.log(name);
    connection.query(loginQuery + name + ';', (err, data) => {
        if (!err) {
            res.send(data);
        } else {
            console.log(err);
            res.send(null);
        }
    })

})

app.get('/main/:id', (req, res) => {
    const id = +req.params.id;
    console.log(id);
    connection.query(allIdeasListQuery + id + ';', (err, data) => {
        if(!err) {
            res.send(data);
        } else {
            res.send(err);
        }
    })
})

app.get('/idea/:id', (req, res) => {
    const id = +req.params.id;
    connection.query(ideaQuery+id+';', (err, data) => {
        if(!err) {
            res.json(data);
        } else {
            res.json(err);
        }
    })
})

app.delete('/idea/:id', (req, res) => {
    const id = +req.params.id;
    console.log(`${deleteIdeaQuery} ${id};`);
    connection.query(`${deleteIdeaQuery} ${id};`, (err, data) => {
        if(!err) {
            res.status(200).send(data);
        } else {
            res.send(err);
        }
    })
})


app.post('/create', (req, res) => {
    let newIdea = {...req.body};
    const {user_id, idea_head, idea_text, date, favourite} = req.body;
    console.log(date);
    connection.query(`${createIdeaQuery} "${user_id}" , "${idea_head}", "${idea_text}", CURRENT_DATE(), ${favourite});`, (err, data) => {
        if(!err) {
            res.status(201).send(data);
        } else {
            res.send(err);
        }
    })
})

app.listen(3030, () => {
    console.log('server runs at port 3030');
})

