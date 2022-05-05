const express = require('express');
const router = express.Router();
const upload = require('../Users/Persistance/uploadManager');
const jsonParser = require('body-parser').json();

const dbManager = require('../Users/Persistance/dbManager');

router.post('/add-content', upload.single('image'), (req, res) => {

    console.log(req.file.buffer.toString('base64'));
    console.log(req.body.thing);
    res.send("xd");

})

module.exports = router;