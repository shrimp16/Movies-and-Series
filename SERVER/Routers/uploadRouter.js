const express = require('express');
const router = express.Router();
const upload = require('../Storage/storageManager');
const jsonParser = require('body-parser').json();

const dbManager = require('../Persistance/dbManager');

router.post('/file/', upload.single('image'), (req, res) => {

    res.send(req.file.filename);

})

router.post('/add-content', jsonParser, (req, res) => {

    dbManager.addContent(req.body.content);

    res.send("Added content with success!");

})

module.exports = router;