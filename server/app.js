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

app.get('*', function(req, res, next) {
    if (req.session.user) {
        res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
    } else {
        res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
    }
});


app.post('/login', (req, res, next) => {
    if (req.session.user) { 
        res.send("user already logged in");
        return;
    }
    return User.checkUser(req.body)
        .then(user => {
            if(user){
                req.session.user = {id: user._id, name: user.username}
                res.send("user logged in");
            } else {
                return next(error);
            }
        })
        .catch(err => next(err))
});

app.post('/logout', function(req, res, next) {
    if (req.session.user) {
        delete req.session.user;
        res.send("user loged out")
    }
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

// var data = JSON.stringify({username: 'test1', password: 'test1'})
// var xmlHttp = new XMLHttpRequest();
// xmlHttp.open("POST", "/login", false); // false for synchronous request
// xmlHttp.setRequestHeader("Content-type", "application/json");
// xmlHttp.send(data);

// var data = JSON.stringify({username: 'test1', password: 'test1'})
// var xmlHttp = new XMLHttpRequest();
// xmlHttp.open("POST", "/logout", false); // false for synchronous request
// xmlHttp.send();
