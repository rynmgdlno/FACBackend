'use strict'

const express = require('express')
const cors = require('cors')
const nodemailer = require('nodemailer')
// const stripe = require('stripe')('sk_test_51IsCuEBBSrRv5J3ZCa9gBzgkUssacOKJcpCUuirhRVK0ZG1IoCbZ5LaDgeIkKJg3OfohbrJVeyVPAGSItpEWHnMi00j3w0nGzC');
// const uuid = require('uuid')
const emailCredentials = require('./email-credentials')
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
  let name = req.body.name
  let email = req.body.email
  let message = req.body.message
  let subject = req.body.subject
  let recipient = req.body.recipient

  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: emailCredentials.auth.user,
      pass: emailCredentials.auth.pass
    }
  })

  const mailParams = {
    from: name,
    to: recipient,
    subject: subject,
    html: `Sender Name: ${name} <br /> Sender Email: ${email} <br /><br /> Message Content: <br />${message}`
  }

  transporter.sendMail(mailParams, (err, data) => {
    if (err) {
      res.json({
        status: err
      })
    } else {
      res.json({
        status: "success"
      })
      console.log("Email Sent " + data.response)
    }
  })

  transporter.verify(function (err, success) {
    if (err) {
      console.log(err)
    } else {
      console.log(success, req.body)
    }
  })
})

// Stripe

app.post('/stripe', (req, res) => {
  stripeFunctions.charge(req, res)
  // res.end(payment)
})

app.listen(PORT, HOST, () => console.log(`Server is running on http://${HOST}:${PORT}`))
