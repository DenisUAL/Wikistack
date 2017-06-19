const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.send('hello');
})
const wikiRouter = require('./wiki');
const userRouter = require('./users');
module.exports = router;