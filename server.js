'use strict'

import express from 'express'
import cors from 'cors'
import nodemailer from 'nodemailer'
import {auth} from './email-credentials.js'

const PORT = process.env.PORT || 5000
const HOST = process.env.HOST || '0.0.0.0'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.listen(PORT, HOST)
console.log(`Server is running on http://${HOST}:${PORT}`)

let transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: auth.user,
    pass: auth.pass
  }
})


// Routes //
app.get('/', function (req, res) {
  res.send('hello world')
})

app.post('/mail', (req, res, next) => {
  let email = req.body.email
  let message = req.body.message
  let subject = req.body.subject
  let name = req.body.name

  async function main() {
    const mailOptions = {
      from: name,
      to: email,
      subject: subject,
      html: `Sender Name: ${name} <br /> Sender Email: ${email} <br /><br /> Message Content: <br />${message}`
    }
    transporter.sendMail(mailOptions, (err, data) => {
      if (err) {
        res.json({
          status: err
        })
      } else {
        res.json({
          status: "success"
        })
        console.log("Email Sent" + data.response)
      }
    })
    transporter.verify(function(err, success) {
      if (err) {
        console.log(err)
      } else {
        console.log("Server is good to go")
      }
    })
  }
  main().catch(console.error)
})