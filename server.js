const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const path = require('path')
const morgan = require('morgan')
const db = require('./queries')

app.use(morgan('combined'));

app.use(express.static(__dirname + "/client/build"));
// app.use('/client', express.static('client'))

// for parsing application/json
app.use(bodyParser.json());

// for parsing application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (req, res) => {
  // res.sendFile(path.join(__dirname + '/client/build/index.html'))
  res.json({ info: 'Poker Run API using React, Node, Express, and Postgres' })
})

app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)

app.listen(port, () => {
  console.log(`Application Server is running on port ${port}.`)
})