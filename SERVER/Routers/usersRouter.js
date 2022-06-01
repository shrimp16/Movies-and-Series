const express = require('express');
const router = express.Router();
const jsonParser = require('body-parser').json();
const path = require('path');

const authManager = require('../Users/auth');
const dbManager = require('../Persistance/dbManager');
const upload = require('../Persistance/uploadManager');


router.post('/register', jsonParser, (req, res) => {
    res.send(authManager.register(req.body.username, req.body.password, req.body.email));
})

router.post('/login', jsonParser, (req, res) => {

    let login = authManager.login(req.body.username, req.body.password);

    if(login === false){
        res.send("Password and/or username wrong!");
    }else {
        res.send(`${login}`);
    }

})

router.post('/update-profile-picture/:id', upload.single('image'), (req, res) => {
    dbManager.editDataFromDatabase('profiles', `picture="${req.file.filename}"`, `userID="${req.params.id}"`);
    res.send('Changed profile picture');
})

router.post('/update-profile-banner/:id', upload.single('image'), (req, res) => {
    dbManager.editDataFromDatabase('profiles', `banner="${req.file.filename}"`, `userID="${req.params.id}"`);
    res.send('Changed profile banner');
})

router.get('/user-content/:id', (req, res) => {
    
    res.send(dbManager.getDataFromTableWithCondition('content', null, `ownerID=${req.params.id}`));

})

router.get('/image/:image', (req, res) => {

    res.sendFile(path.join(__dirname, `../Persistance/Images/${req.params.image}`));

})

router.get('/user-profile/:id', (req, res) => {

    let userProfile = {
        username: dbManager.getDataFromTableWithCondition('users', 'username', `userID=${req.params.id}`)[0].username,
        description: dbManager.getDataFromTableWithCondition('profiles', 'description', `userID=${req.params.id}`)[0].description,
        picture: dbManager.getDataFromTableWithCondition('profiles', 'picture', `userID=${req.params.id}`)[0].picture,
        banner: dbManager.getDataFromTableWithCondition('profiles', 'banner', `userID=${req.params.id}`)[0].banner
    }

    res.send(userProfile);
})

router.delete('/remove-content/:id', (req, res) => {

    dbManager.removeFromDatabse('content', `contentID=${req.params.id}`);

    res.send("Content deleted!");

})

module.exports = router;