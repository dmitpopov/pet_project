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
    // password: 'abcd1234',
    database: 'ideas'
})


let loginQuery = `SELECT * FROM users WHERE login = `;
let ideaQuery = `SELECT * FROM ideas WHERE id = `;
let allIdeasListQuery = `SELECT * FROM ideas WHERE user_id = `;
let createIdeaQuery = `INSERT INTO ideas (user_id, idea_head, idea_text, date, favourite) VALUES (`;
let deleteIdeaQuery = `DELETE FROM ideas WHERE id = `;
let ideasForMessageQuery = `SELECT * FROM ideas WHERE TO_DAYS(NOW()) - TO_DAYS(date) <= 7;`;
let registrationQuery = `INSERT INTO users (name, surname, login, hashedpass, email, salt) VALUES (`;

let transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: '18a01110183d2d',
        pass: 'c74e5eb864cbf7'
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
    let letter = '<div style="padding:20px;">'
    letter += '<h1 style="font-family: Helvetica, sans-serif; margin: 0 0 40px;">Список идей за прошедшую неделю</h1>';
    if(data.length === 0) {
        letter += '<p style="margin: 0 0 30px;">Пока ничего нового<p>';
    } else {
        data.forEach((item) => {
            letter += ` <div style="font-family: Helvetica, sans-serif; width: 60%; min-width: 360px">
                            <h2 style="margin: 0 0 10px; font-weight: 400;">${item.idea_head}</h2>
                            <p style="margin: 0 0 30px;">${item.idea_text}</p>
                        </div>`
        });
    }
    letter += '</div>';

    transporter.sendMail({
        from: '98b4ed6e6d-4c1a6f@inbox.mailtrap.io',
        to: 'dpopov1979@yandex.ru',
        subject: 'Ideas reminder',
        html: letter
    })
    .then((data) => console.log(data))
    .catch((err) => {
        console.log(err);
    })
}

// cron.schedule('*/1 * * * *', () => {
    getMessagesToRemind();
// });

app.post('/reg', (req, res) => {
    const {name, surname, login, pass, email} = req.body;

    const salt = bcrypt.genSaltSync(5);
    const hashedPass = bcrypt.hashSync(pass, salt);

    connection.query(`${registrationQuery}'${name}', '${surname}', '${login}', '${hashedPass}', '${email}', '${salt}');`, (err, data) => {
        if(!err){
            res.status(200).send();
        } else {
            res.status(400).send();
        }
    })
})


app.post('/login', (req, res) => {
    const { login, pass } = req.body;

    connection.query(`${loginQuery}'${login}';`, (err, data) => {
        if (!err && data.length) {
            const user = data[0];
            const hashedPass = bcrypt.hashSync(pass, user.salt);

            if (hashedPass === user.hashedpass) {
                const token = randtoken.generate(15);

                connection.query(`UPDATE users SET token = '${token}' WHERE id = '${user.id}';`, (err, data) => {
                    if (!err) {
                        res.send(JSON.stringify({ token: token }));
                    } else {
                        res.status(500).send({ err: 'DB error' });
                    }
                });
            } else {
                res.status(401).send({ err: 'Unauthorized' });
            }            
        } else {
            res.status(401).send({ err: 'Unauthorized' });
        }
    })
})

app.get('/ideas', (req, res) => {
    const token = req.get('token');

    connection.query(`SELECT * FROM users WHERE token = '${token}'`, (err, data) => {
        if (!err && data.length) {
            const user = data[0];
            const id = user.id;

            connection.query(allIdeasListQuery + id + ';', (err, data) => {
                if(!err) {
                    res.send(data);
                } else {
                    res.send(err);
                }
            });
        } else {
            res.status(401).send(JSON.stringify({ err: 'Unauthorized request' }));
        }
    });
})

app.get('/idea/:id', (req, res) => {
    const token = req.get('token');

    connection.query(`SELECT * FROM users WHERE token = '${token}'`, (err, data) => {
        if (!err && data.length) {
            const id = +req.params.id;
            connection.query(ideaQuery + id + ';', (err, data) => {
                if(!err) {
                    res.json(data);
                } else {
                    res.json(err);
                }
            });
        } else {
            res.status(401).send(JSON.stringify({ err: 'Unauthorized request' }));
        }
    });
})

app.delete('/idea/:id', (req, res) => {
    const token = req.get('token');
    connection.query(`SELECT * FROM users WHERE token = '${token}'`, (err, data) => {
        if (!err && data.length) {
            const id = +req.params.id;
            connection.query(`${deleteIdeaQuery} ${id};`, (err, data) => {
                if(!err) {
                    res.status(200).send(JSON.stringify({ result: 'Ok' }));
                } else {
                    res.status(500).send(JSON.stringify({ err: 'DB error' }));
                }
            });
        } else {
            res.status(401).send(JSON.stringify({ err: 'Unauthorized request' }));
        }
    });
})


app.post('/idea', (req, res) => {
    const token = req.get('token');

    connection.query(`SELECT * FROM users WHERE token = '${token}'`, (err, data) => {
        if (!err && data.length) {
            const user = data[0];
            const { idea_head, idea_text, date, favourite } = req.body;

            connection.query(`${createIdeaQuery} "${user.id}" , "${idea_head}", "${idea_text}", CURRENT_DATE(), ${favourite});`, (err, data) => {
                if(!err) {
                    res.status(201).send(JSON.stringify({ result: 'Ok' }));
                } else {
                    res.status(500).send(JSON.stringify({ err: 'DB error' }));
                }
            })
        } else {
            res.status(401).send(JSON.stringify({ status: 401, err: 'Unauthorized request' }));
        }
    });
});

app.get('/logout', (req, res) => {
    const token = req.get('token');

    connection.query(`SELECT * FROM users WHERE token = '${token}'`, (err, data) => {
        if (!err && data.length) {
            const user = data[0];

            connection.query(`UPDATE users SET token = NULL WHERE id = ${user.id}`, (err, data) => {
                if(!err) {
                    res.status(201).send();
                } else {
                    res.send(err);
                }
            })
        } else {
            res.status(401).send(JSON.stringify({ err: 'Unauthorized request' }));
        }
    });
});

app.listen(3030, () => {
    console.log('server runs at port 3030');
})

