const express = require('express');
const app = express();

const PORT = 12345;

const pageRouter = require('./Routers/pageRouter');
const usersRouter = require('./Routers/usersRouter');
const uploadRouter = require('./Routers/uploadRouter');

app.listen(PORT, () => {
    console.log(`Server running on Port: ${PORT}`);
})

app.use(express.static(__dirname + '/Routers/WEB-PAGE'));

app.use(pageRouter);
app.use(usersRouter);
app.use(uploadRouter);