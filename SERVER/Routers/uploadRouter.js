const express = require('express');
const router = express.Router();
const upload = require('../Storage/storageManager');
const jsonParser = require('body-parser').json();

const usersManager = require('../Users/users');
const fileManager = require('../Users/fileManager');

router.post('/file/', upload.single('image'), (req, res) => {

    res.send(req.file.filename);

})

router.post('/add-content/:id', jsonParser, (req, res) => {

    let users = fileManager.getUsers();
    let content = req.body.content;

    users[req.params.id].content.push(content);

    fileManager.updateFile(users);

    res.send("Added content with success!");

})

module.exports = router;