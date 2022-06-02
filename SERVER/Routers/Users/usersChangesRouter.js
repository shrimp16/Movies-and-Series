const express = require('express');
const router = express.Router();
const jsonParser = require('body-parser').json();

const dbManager = require('../../Persistance/dbManager');
const upload = require('../../Persistance/uploadManager');

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

router.post('/test-array', upload.array('images', 2), (req, res) => {
    console.log(req.body);
    console.log(req.files);

    if(req.body.picture && !req.body.banner){
        console.log('Change picture and not the banner');
    }

    if(!req.body.picture && req.body.banner){
        console.log('Change banner but not picture');
    }

    if(req.body.picture && req.body.banner){
        console.log('change both');
    }

    if(!req.body.picture && !req.body.banner){
        console.log('dont change anything');
    }

    if(req.body.description){
        console.log("change description");
    }
})

module.exports = router;