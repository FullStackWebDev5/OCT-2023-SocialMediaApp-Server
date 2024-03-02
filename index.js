const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const cors = require('cors')

app.use(cors())
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

const User = mongoose.model('User', { // users
    firstName: String,
    lastName: String,
    email: String,
    avatar: String
})

app.get('/', (req, res) => {
  res.send('Our first Node Express Server!')
})

// READ (GET)
app.get('/users', async (req, res) => {
    try {
        const users = await User.find()
        res.json({
            status: 'SUCCESS',
            data: users
        })
    } catch (error) {
        res.status(500).json({
            status: 'FAILED',
            message: 'Something went wrong!'
        })
    }
})

// CREATE (POST)
app.post('/users', async (req, res) => {
    const { firstName, lastName, email, avatar } = req.body
    try {
        await User.create({
            firstName,
            lastName,
            email,
            avatar
        })
        res.json({
            status: 'SUCCESS'
        })
    } catch (error) {
        res.status(500).json({
            status: 'FAILED',
            message: 'Something went wrong!'
        })
    }
})

// UPDATE (PATCH)
app.patch('/users/:id', async (req, res) => {
    const { id } = req.params
    const { firstName, lastName, email, avatar } = req.body
    try {
        await User.findByIdAndUpdate(id, {
            firstName,
            lastName,
            email,
            avatar
        })
        res.json({
            status: 'SUCCESS'
        })
    } catch (error) {
        res.status(500).json({
            status: 'FAILED',
            message: 'Something went wrong!'
        })
    }
})

// DELETE (DELETE)
app.delete('/users/:id', async (req, res) => {
    const { id } = req.params
    try {
        await User.findByIdAndDelete(id)
        res.json({
            status: 'SUCCESS'
        })
    } catch (error) {
        res.status(500).json({
            status: 'FAILED',
            message: 'Something went wrong!'
        })
    }
})


app.listen(process.env.PORT, () => {
    mongoose
        .connect(process.env.MONGODB_URL)
        .then(() => console.log('Server is up :)'))
        .catch((error) => console.log(error))
})

/*
    CORS: Cross-origin resource sharing
*/