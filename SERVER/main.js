const express = require('express');
const upload = require('./Storage/storageManager');
const app = express();
const usersRouter = require('./Routers/usersRouter');

app.listen(12345, () => {
    console.log("server running");
})

app.use(usersRouter);

app.post('/file', upload.single('image'), (req, res) => {
    res.send(req.file.filename);
})