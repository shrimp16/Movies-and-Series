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

router.get('/user-content/:id', (req, res) => {
    
    res.send(dbManager.getDataFromTableWithCondition('content', null, `ownerID=${req.params.id}`));

})

router.get('/image/:image', (req, res) => {

    res.sendFile(path.join(__dirname, `../Persistance/Images/${req.params.image}`));

})

router.delete('/remove-content/:id', (req, res) => {

    dbManager.removeFromDatabse('content', `contentID=${req.params.id}`);

    res.send("Content deleted!");

})

module.exports = router;