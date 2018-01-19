import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import * as User from './dbUtils/userUtils';
import * as Event from './dbUtils/eventUtils';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get('*', function(req, res, next) {
    if(req.session.user){
        res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
    }
});

app.post('/login', (req, res, next) => {
    User.checkUser(req.body)
        .then(data => res.send(data))
        .catch(err => res.send(err))
});

app.post('/registration', (req, res, next) => {
    User.createUser(req.body)
        .then(data => res.send(data))
        .catch(err => res.send(err))
});

app.delete('/user', (req, res, next) => {
    User.deleteUser(req.body)
        .then(data => res.send(data))
        .catch(err => res.send(err))
});

module.exports = app;