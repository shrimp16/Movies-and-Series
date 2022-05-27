const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../WEB-PAGE/index.html'));
})

//es.sendFile(path.join(__dirname, `../Persistance/Images/${req.params.image}`));

module.exports = router;