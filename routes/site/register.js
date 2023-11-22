const express = require('express')
const router = express.Router()
const {register} = require('../../controllers/authenticate')

router.post('/', register).get('/', function(req, res) {
    res.render('../views/site/register')
})

module.exports = router