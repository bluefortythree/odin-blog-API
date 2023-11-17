const express = require('express')
const router = express.Router()
const {logout} = require('../controllers/authenticate')

router.post('/', logout).get('/', function(req, res) {
    res.render('logout')
})

module.exports = router