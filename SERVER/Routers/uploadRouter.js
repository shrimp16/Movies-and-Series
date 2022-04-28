const express = require('express');
const router = express.Router();
const upload = require('../Storage/storageManager');

const usersManager = require('../Users/users');
const fileManager = require('../Users/fileManager');

router.post('/file/', upload.single('image'), (req, res) => {

    res.send(req.file.filename);

})


module.exports = router;