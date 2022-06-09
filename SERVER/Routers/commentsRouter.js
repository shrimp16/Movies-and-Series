const express = require('express');
const router = express.Router();
const jsonParser = require('body-parser').json();
const dbManager = require('../Persistance/dbManager');

router.get('get-comments/:id', (req, res) => {
    res.send(dbManager.getAllFromTable('comments'));
})

router.post('/add-comment', jsonParser, (req, res) => {

    const comment = {
        ownerID: req.body.ownerID,
        contentID: req.body.contentID,
        text: req.body.text,
        liked: 0
    }

    dbManager.addToDatabase('comments', comment);
    res.send("Sucess");

})

router.delete('/remove-comment/:id', (req, res) => {
    dbManager.removeFromDatabse('comments', `commentID=${req.params.id}`);
    res.send("Sucess");
})