const express = require('express');
const router = express.Router();
const jsonParser = require('body-parser').json();

const dbManager = require('../Persistance/dbManager');
const upload = require('../Persistance/uploadManager');

router.post('/update-profile-picture/:id', upload.single('image'), (req, res) => {
    dbManager.editDataFromDatabase('profiles', `picture="${req.file.filename}"`, `userID="${req.params.id}"`);
    res.send('Changed profile picture');
})

router.post('/update-profile-banner/:id', upload.single('image'), (req, res) => {
    dbManager.editDataFromDatabase('profiles', `banner="${req.file.filename}"`, `userID="${req.params.id}"`);
    res.send('Changed profile banner');
})

router.post('/update-description/:id', jsonParser, (req, res) => {
    dbManager.editDataFromDatabase('profiles', `description="${req.body.description}"`, `userID="${req.params.id}"`);
    res.send('Changed description');
})