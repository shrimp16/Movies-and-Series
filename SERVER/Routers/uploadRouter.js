const express = require('express');
const router = express.Router();
const upload = require('../Persistance/uploadManager');

const dbManager = require('../Persistance/dbManager');

router.post('/add-content', upload.single('image'), (req, res) => {

    let newContent = {
        ownerID: req.body.ownerID,
        title: req.body.title,
        text: req.body.text,
        rate: req.body.rate,
        image: req.file.buffer.toString('base64')
    }

    dbManager.addContent(newContent);

    res.send("Added content!");

})

module.exports = router;