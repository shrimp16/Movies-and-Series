const express = require('express');
const upload = require('./Storage/storageManager');
const app = express();
const usersRouter = require('./Routers/usersRouter');

app.listen(12345, () => {
    console.log("server running");
})

app.use(usersRouter);