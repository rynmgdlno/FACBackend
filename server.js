'use strict'

const express = require('express')
const cors = require('cors')

const email = require('./nodemailer')
const stripeFunctions = require('./stripe')

const app = express()

const PORT = process.env.PORT || 5000
const HOST = process.env.HOST || '0.0.0.0'

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// Routes 
// Testing

app.get('/', (req, res) => {
  res.send('Fremont Arts Council API')
})

app.get('/test', (req, res) => {
  res.send('Fremont Arts Council API')
})

// Nodemailer

app.post('/mail', (req, res) => {
  email.sendMail(req, res)
})

// Stripe

app.post('/stripe', (req, res) => {
  stripeFunctions.charge(req, res)
  // res.end(payment)
})

app.listen(PORT, HOST, () => console.log(`Server is running on http://${HOST}:${PORT}`))
