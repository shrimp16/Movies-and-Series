const express = require('express');
const app = express();

const usersRouter = require('./Routers/usersRouter');
const uploadRouter = require('./Routers/uploadRouter');

app.listen(12345, () => {
    console.log("server running");
})

app.use(usersRouter);
app.use(uploadRouter);