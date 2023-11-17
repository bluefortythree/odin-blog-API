const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')

const register = async(req, res) => {
    const {username, password} = req.body
    const userExists = await User.findOne({username})
    if (!username || !password) {
        res.status(StatusCodes.BAD_REQUEST).json({message: 'Please provide username and password.'})
    } else if (userExists) {
        res.status(StatusCodes.BAD_REQUEST).json({message: 'Username already exists. Please log in.'})
    } else if (password.length < 6) {
        res.status(StatusCodes.BAD_REQUEST).json({message: 'Password must be at least six characters'})
    } else if (username.includes(' ')) {
        res.status(StatusCodes.BAD_REQUEST).json({message: 'Username cannot contain spaces.'})
    } else {
        const salt = await bcrypt.genSalt(10)
        const hashed = await bcrypt.hash(req.body.password, salt)
        const user = await User.create({username, password: hashed})
        const token = jwt.sign({username: req.body.username}, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_LIFETIME
        })
        res.status(StatusCodes.CREATED).json({username, token})
        console.log(user) 
    }
}

// const login = async(req, res) => {
//     const {username, password} = req.body
//     const userExists = await User.findOne({username})
//     if (!username || !password) {
//         res.status(StatusCodes.BAD_REQUEST).json({message: 'Please provide username and password.'})
//     } else if (!userExists) {
//         res.status(StatusCodes.BAD_REQUEST).json({message: 'Invalid username or password.'})
//     } else {
//         const correctPassword = await bcrypt.compare(password, userExists.password)
//         if (!correctPassword) {
//             res.status(StatusCodes.BAD_REQUEST).json({message: 'Invalid username or password.'})
//         } else {
//             const token = jwt.sign({username}, process.env.JWT_SECRET, {
//                 expiresIn: process.env.JWT_LIFETIME
//             })
//             res.status(StatusCodes.OK).cookie('token', token).json({username, token})
//             console.log(req.headers)
//         }
//     }
// }

const login = async(req, res) => {
    const {username} = req.body
    const token = jwt.sign({username}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME
    })
    res.status(StatusCodes.OK).cookie('token', token).json({username, token})
    console.log(req.headers)
}

const logout = (req, res) => {
    const loggedIn = req.cookies.token
    if(!loggedIn) {
        throw new Error('You are already logged out!')
    } else {
        res.clearCookie('token').status(200).json({message: 'Logged out'})
    }
}

module.exports = {register, login, logout}


