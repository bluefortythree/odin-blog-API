const express = require('express')
const router = express.Router()
const {login} = require('../controllers/authenticate')
const passport = require('passport')


router.post('/', passport.authenticate('local', {failureRedirect: '/login', failureFlash: true}), login).get('/', function(req, res) {
    res.render('login')
})

module.exports = router