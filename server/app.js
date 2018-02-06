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
    httpOnly: true,
    secure: false 
  },
  key: 'sessionId',
  store: new MongoStore({ 
    url: 'mongodb://nickvhite:Nick123nick@ds159707.mlab.com:59707/calendardb',
  })
}));
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.post('/login', (req, res, next) => {
    if (req.session.user) {
        res.status(202).end("user already logged in");
        return;
    }
    return User.checkUser(req.body)
        .then(user => {
            req.session.user = {id: user._id}
            return Event.checkEvent(user._id)
                .then(event => res.status(200).end(JSON.stringify(event)))
                .catch(err => res.status(202).end(err))
        })
        .catch(err => res.status(202).end(err))
});

app.post('/events', (req, res, next) => {
    return Event
        .updateEvent({user_id: req.session.user.id, events: req.body})
            .then(events => res.status(200).end(JSON.stringify(events.events)))
            .catch(err => res.status(202).end(err))
})

app.post('/logout', function(req, res, next) {
    if (req.session.user) {
        delete req.session.user;
        res.status(200).end('true');
    }
});

app.post('/registration', (req, res) => {
    if (req.session.user) { 
        res.end("logged user can`t register");
        return;
    }
    User.createUser(req.body)
        .then(data => {
                req.session.user = {id: data._id};
                return Event.createEventContainer({user_id: data._id})
            })
            .then(event => {
                res.status(200).end(JSON.stringify(event.events));
            })
            .catch(err => res.status(202).end(err))
        .catch(err => res.status(202).end(err))
});

app.post('/autorised', (req, res) => {
    if (req.session.user) {
        return Event.checkEvent(req.session.user.id)
            .then(event => res.status(200).end(JSON.stringify(event)))
            .catch(err => res.status(202).end(err))
    } else {
        res.status(202).end('false');
    }
});

module.exports = app;