const express = require('express');
const router = express.Router();
const upload = require('../Persistance/uploadManager');
const path = require('path');

const dbManager = require('../Persistance/dbManager');

let file;

router.post('/add-content', upload.single('image'), (req, res) => {

    let newContent = {
        ownerID: req.body.ownerID,
        title: req.body.title,
        text: req.body.text,
        rate: req.body.rate
        //image: req.file.buffer.toString('base64')
    }

    console.log(req.file);
    file = req.file.filename;
    //dbManager.addContent(newContent);

    res.send("Added content!");

})

router.get('/test-file', (req, res) => {
    res.sendFile(path.join(__dirname, `../Persistance/Images/${file}`));
})

module.exports = router;