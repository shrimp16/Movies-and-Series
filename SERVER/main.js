const express = require('express');
const upload = require('./Storage/storageManager');
const app = express();

app.listen(12345, () => {
    console.log("server running");
})

app.post('/file', upload.single('image'), (req, res) => {
    res.send(req.file.filename);
})