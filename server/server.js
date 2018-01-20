import app from './app';
import mongoose from 'mongoose';

const http = require('http').Server(app);
const PORT = process.env.PORT || 3000;
let db;

mongoose.connect('mongodb://nickvhite:Nick123nick@ds159707.mlab.com:59707/calendardb', function (err) {
    if (err) {
        console.log(err);
    }
    db = mongoose.connection.openUri('mongodb://nickvhite:Nick123nick@ds159707.mlab.com:59707/calendardb');
    http.listen(PORT, function () {
        console.log(`Listening on port ${PORT}`);
    });
});

module.exports = db;