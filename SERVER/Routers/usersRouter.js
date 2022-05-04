const express = require('express');
const router = express.Router();
const jsonParser = require('body-parser').json();

const authManager = require('../Users/auth');
const dbManager = require('../Persistance/dbManager');

router.post('/register', jsonParser, (req, res) => {
    res.send(authManager.register(req.body.username, req.body.password));
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
    
    res.send(dbManager.getUserContent(req.params.id));

})

router.delete('/remove-content/:id', (req, res) => {

    dbManager.removeContent(req.params.id);

    res.send("Content deleted!");

})

module.exports = router;