const express = require('express');
const yargs = require('yargs');
const app = express();
const cors = require('cors');

const PORT = yargs.argv._[0] || 50000;

const pageRouter = require('./Routers/pageRouter');
const usersRouter = require('./Routers/usersRouter');
const uploadRouter = require('./Routers/uploadRouter');

app.listen(PORT, () => {
    console.log(`Server running on Port: ${PORT}`);
})

app.use(express.static(__dirname + '/Routers/WEB-PAGE'));

app.use(cors());

const jsonParser = require('body-parser').json();
const dbManager = require('./Users/Persistance/dbManager');

app.post('/add-comment', jsonParser, (req, res) => {
    console.log(req.body);
    const comment = {
        ownerID: req.body.ownerID,
        contentID: req.body.contentID,
        text: req.body.text,
        liked: 0
    }
    dbManager.addComment(comment);
    res.send("Sucess");
})

app.use(pageRouter);
app.use(usersRouter);
app.use(uploadRouter);