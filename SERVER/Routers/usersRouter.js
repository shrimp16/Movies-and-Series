const express = require('express');
const router = express.Router();
const jsonParser = require('body-parser').json();

const authManager = require('../Users/auth');
const userManager = require('../Users/users');

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

router.get('/user/:id', (req, res) => {
    
    res.send(userManager.getUserContent(req.params.id));

})

module.exports = router;