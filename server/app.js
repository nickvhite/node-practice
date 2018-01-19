import express from 'express';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get('*', function(req, res, next) {
    if(req.session.user){
        res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
    }
});

module.exports = app;