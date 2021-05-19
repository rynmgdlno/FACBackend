'use strict'

import express from 'express'
import cors from 'cors'
import nodemailer from 'nodemailer'

const PORT = process.env.PORT || 5000
const HOST = process.env.HOST || '0.0.0.0'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.listen(PORT, HOST)
console.log(`Server is running on http://${HOST}:${PORT}`)

// Routes //
app.get('/', function (req, res) {
  res.send('hello world')
})
