const express = require('express');
const router = express.Router();
const jsonParser = require('body-parser').json();

const authManager = require('../Users/auth');

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

module.exports = router;