const express = require('express')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const knex = require('knex')
const dotenv = require('dotenv')
dotenv.config()

const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')
const PORT = process.env.PORT

const db = knex({
  client: 'pg',
  connection: {
    host: process.env.HOST,
    user: process.env.USER,
    database: process.env.DATABASE_NAME,
    password: process.env.PASSWORD
  }
})

const app = express()

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => { res.send('You are hitting the home route endpoint. It is working!') })
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) })
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db) })
app.put('/image', (req, res) => { image.handleImage(req, res, db) })
app.post('/imageurl', (req, res) => { image.handleAPICall(req, res) })

app.listen(PORT, () => {
  console.log(`App is running on port: ${PORT}`);
})