const express = require('express');
const router = express.Router();
const jsonParser = require('body-parser').json();

const dbManager = require('../../Persistance/dbManager');
const upload = require('../../Persistance/uploadManager');
const pwGenerator = require('../../Users/pwGenerator');

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

router.post('/generate-new-password/:id', (req, res) => {
    let newPassword = pwGenerator.generate();
    dbManager.editDataFromDatabase('users', `password="${newPassword}"`, `userID="${req.params.id}"`)
    res.send('Password updated');
})

router.post('/change-password/:id', jsonParser, (req, res) => {
    dbManager.editDataFromDatabase('users', `password="${req.body.password}"`, `userID="${req.params.id}"`);
    res.send('Password updated');
})

module.exports = router;