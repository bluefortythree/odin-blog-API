require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const cookieParser = require('cookie-parser')
const helmet = require('helmet')
const passport = require('passport')
const session = require('express-session')
// flash allows us to send the 'incorrect password' message
const flash = require('express-flash')

const app = express()
app.set('view engine', 'pug')

const registerRouter = require('./routes/register')
const loginRouter = require('./routes/login')
const logoutRouter = require('./routes/logout')
const homeRouter = require('./routes/home')

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(flash())
app.use(cookieParser())
app.use(helmet())

app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')

const authentication = require('./middleware/authentication')

app.use('/register', registerRouter)
app.use('/login', loginRouter)
app.use('/logout', logoutRouter)
app.use('/home', authentication, homeRouter)

const port = process.env.PORT || 5000
const start = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}...`)
        })
    } catch (err) {
        console.log(err)
    }
}

start()

module.exports = app