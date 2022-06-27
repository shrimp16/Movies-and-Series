const express = require('express');
const router = express.Router();
const jsonParser = require('body-parser').json();
const path = require('path');

const authManager = require('../../Users/auth');
const dbManager = require('../../Persistance/dbManager');


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

router.get('/user-content/:id', (req, res) => {
    
    res.send(dbManager.getDataFromTableWithCondition('content', null, `ownerID=${req.params.id}`));

})

router.get('/content/:id', (req, res) => {

    res.send(dbManager.getDataFromTableWithCondition('content', null, `contentID=${req.params.id}`));

})

router.get('/image/:image', (req, res) => {

    res.sendFile(path.join(__dirname, `../../Persistance/Images/${req.params.image}`));

})

router.get('/user-picture/:id', (req, res) => {

    let image = dbManager.getDataFromTableWithCondition('profiles', 'picture', `userID=${req.params.id}`);
    res.sendFile(path.join(__dirname, `../../Persistance/Images/${image[0].picture}`));

})

router.get('/user-profile/:id', (req, res) => {

    if(dbManager.getDataFromTableWithCondition('users', null, `userID=${req.params.id}`).length < 1){
        res.sendStatus(404);
        return;
    }

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