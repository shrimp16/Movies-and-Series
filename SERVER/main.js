const express = require('express');
const yargs = require('yargs');
const app = express();
const cors = require('cors');
const path = require('path');

const PORT = yargs.argv._[0] || 50000;

const pageRouter = require('./Routers/pageRouter');
const uploadRouter = require('./Routers/uploadRouter');
const usersRouter = require('./Routers/Users/usersRouter');
const usersChangesRouter = require('./Routers/Users/usersChangesRouter');

app.listen(PORT, () => {
    console.log(`Server running on Port: ${PORT}`);
})

app.use(express.static(path.join(__dirname, '../WEB-PAGE')));

app.use(cors());

app.use(pageRouter);
app.use(uploadRouter);
app.use(usersRouter);
app.use(usersChangesRouter);