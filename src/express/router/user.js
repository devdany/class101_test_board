const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('express user test')
})

module.exports = router;