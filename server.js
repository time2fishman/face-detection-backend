const express = require('express')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())

const database = {
  users: [
    {
      id: '123',
      name: 'John',
      email: 'john@fake.com',
      password: 'cookies',
      entries: 0,
      joined: new Date()
    },
    {
      id: '124',
      name: 'Sally',
      email: 'sally@fake.com',
      password: 'bananas',
      entries: 0,
      joined: new Date()
    }
  ]
}

// / --> respond with "this is working"
app.get('/', (req, res) => {
  res.send(database.users)
})

// /signin --> POST = success/fail
app.post('/signin', (req, res) => {
  // // Load hash from your password DB.
  // bcrypt.compare("apples", database.login[0].hash, function (err, res) {
  //   // res == true
  //   console.log('first guess: ', res);
  // });
  // bcrypt.compare("veggies", database.login[0].hash, function (err, res) {
  //   // res = false
  //   console.log('second guess: ', res);
  // });
  if (req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password) {
    res.json('success')
  } else {
    res.status(400).json('error loggin in')
  }
})

// /register --> POST = user
app.post('/register', (req, res) => {
  const { email, name, password } = req.body

  // bcrypt.hash(password, null, null, function (err, hash) {
  //   // Store hash in your password DB.
  //   console.log(hash);
  // });

  database.users.push(
    {
      id: '125',
      name: name,
      email: email,
      password: password,
      entries: 0,
      joined: new Date()
    }
  )

  res.json(database.users[database.users.length - 1])
})

//profile/:userId --> GET = user
app.get('/profile/:id', (req, res) => {
  const { id } = req.params
  let found = false

  database.users.forEach(user => {
    if (user.id === id) {
      found = true
      return res.json(user)
    }
  })
  if (!found) {
    res.status(404).json('User not found')
  }
})

// /image --> PUT = user count of some sort
app.post('/image', (req, res) => {
  const { id } = req.body
  let found = false

  database.users.forEach(user => {
    if (user.id === id) {
      found = true
      user.entries++
      return res.json(user.entries)
    }
  })
  if (!found) {
    res.status(404).json('User not found')
  }
})

app.listen(3001, () => {
  console.log('App is running on port: 3001');
})