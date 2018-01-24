import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import path from 'path';
import * as User from './dbUtils/userUtils';
import * as Event from './dbUtils/eventUtils';

const app = express();
const MongoStore = require('connect-mongo')(session);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
  secret: 'Super secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 15778476000,
    httpOnly: true,
    secure: false 
  },
  key: 'sessionId',
  store: new MongoStore({ 
    url: 'mongodb://nickvhite:Nick123nick@ds159707.mlab.com:59707/calendardb',
  })
}));
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get('*', (req, res) => {
    if (req.session.user) {
        res.sendFile(path.resolve(__dirname, '../client/build'));
    } else {
        res.sendFile(path.resolve(__dirname, '../client/build'));
    }
});

app.post('/login', (req, res, next) => {
    if (req.session.user) {
        res.end("user already logged in");
        return;
    }
    return User.checkUser(req.body)
        .then(user => {
            if(user){
                req.session.user = {id: user._id, name: user.username};
                res.end('true');
            } else {
                return res.end(error);
            }
        })
        .catch(err => res.end(err))
});

app.post('/logout', function(req, res, next) {
    if (req.session.user) {
        delete req.session.user;
        res.end('true');
    }
});

app.post('/registration', (req, res, next) => {
    if (req.session.user) { 
        res.end("logged user can`t register");
        return;
    }
    User.createUser(req.body)
        .then(data => res.end(data))
        .catch(err => res.end(err))
});

app.post('/autorised', (req, res) => {
    if (req.session.user) {
        res.end('true');
    } else {
        res.end('false');
    }
});

module.exports = app;