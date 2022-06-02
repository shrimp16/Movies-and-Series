const express = require('express');
const router = express.Router();
const jsonParser = require('body-parser').json();

const dbManager = require('../../Persistance/dbManager');
const upload = require('../../Persistance/uploadManager');

router.post('/update-profile/:id', upload.array('images', 2), (req, res) => {

    if(req.body.picture && !req.body.banner){
        dbManager.editDataFromDatabase('profiles', `picture="${req.files[0].filename}"`, `userID="${req.params.id}"`);
    }

    if(!req.body.picture && req.body.banner){
        dbManager.editDataFromDatabase('profiles', `banner="${req.files[0].filename}"`, `userID="${req.params.id}"`);
    }

    if(req.body.picture && req.body.banner){
        dbManager.editDataFromDatabase('profiles', `picture="${req.files[0].filename}"`, `userID="${req.params.id}"`);
        dbManager.editDataFromDatabase('profiles', `banner="${req.files[1].filename}"`, `userID="${req.params.id}"`);
    }

    if(req.body.description){
        dbManager.editDataFromDatabase('profiles', `description="${req.body.description}"`, `userID="${req.params.id}"`);
    }

    res.send('Profile updated')
})

module.exports = router;