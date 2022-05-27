const express = require('express');
const yargs = require('yargs');
const app = express();
const cors = require('cors');
const path = require('path');

const PORT = yargs.argv._[0] || 50000;

const pageRouter = require('./Routers/pageRouter');
const usersRouter = require('./Routers/usersRouter');
const uploadRouter = require('./Routers/uploadRouter');

app.listen(PORT, () => {
    console.log(`Server running on Port: ${PORT}`);
})

app.use(express.static(path.join(__dirname, '../WEB-PAGE')));

app.use(cors());

app.use(pageRouter);
app.use(usersRouter);
app.use(uploadRouter);