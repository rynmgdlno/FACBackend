'use strict'

import express from 'express'
import cors from 'cors'

// Constants
const PORT = 42069
const HOST = '0.0.0.0'

// App
const app = express()

app.use(cors())

app.get('/', function (req, res) {
  res.send('hello world')
})

app.listen(PORT, HOST)
console.log(`Server is running on http://${HOST}:${PORT}`)