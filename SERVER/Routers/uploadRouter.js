const express = require('express');
const router = express.Router();
const upload = require('../Persistance/uploadManager');
const jsonParser = require('body-parser').json();

const dbManager = require('../Persistance/dbManager');

router.post('/add-content', jsonParser, upload.single('image'), (req, res) => {

    console.log(req.body);

    let newContent = {
        ownerID: req.body.ownerID,
        title: req.body.title,
        text: req.body.text,
        rate: req.body.rate,
        image: req.file.filename
    }

    dbManager.addToDatabase('content', newContent);

    res.send("Added content!");

})

module.exports = router;