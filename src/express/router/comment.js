const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('express comment test')
})

module.exports = router;