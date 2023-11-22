require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const helmet = require('helmet')
const passport = require('passport')
const session = require('express-session')
const flash = require('express-flash')

const app = express()
app.set('view engine', 'pug')

const homeRouter = require('./routes/admin/home')
const postsRouter = require('./routes/admin/posts')

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(helmet())

app.use('/home', homeRouter)
app.use('/posts', postsRouter)

const port = process.env.PORT || 3000
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