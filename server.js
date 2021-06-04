'use strict'

const express = require('express')
const cors = require('cors')
const nodemailer = require('nodemailer')

const emailCredentials = require('./email-credentials')
const email = require('./nodemailer')
const stripeFunctions = require('./stripe')


const app = express()

const PORT = process.env.PORT || 5000
const HOST = process.env.HOST || '0.0.0.0'

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// Routes 
// Nodemailer

app.post('/mail', (req, res) => {
  email.sendMail(req, res, emailCredentials)
})

// Stripe

app.post('/stripe', (req, res) => {
  stripeFunctions.charge(req, res)
  // res.end(payment)
})

app.listen(PORT, HOST, () => console.log(`Server is running on http://${HOST}:${PORT}`))
