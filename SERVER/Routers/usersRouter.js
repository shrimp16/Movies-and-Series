const express = require('express');
const router = express.Router();
const jsonParser = require('body-parser').json();

const authManager = require('../Users/auth');

router.post('/register', jsonParser, (req, res) => {
    res.send(authManager.register(req.body.username, req.body.password));
})

module.exports = router;