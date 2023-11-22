const express = require('express')
const router = express.Router()
const {logout} = require('../../controllers/authenticate')

router.post('/', logout, (req, res, next) => {
    req.logout(function(err) {
        if(err) {
            return next(err)
        }
    })
}).get('/', function(req, res) {
    res.render('../views/site/logout')
})

module.exports = router