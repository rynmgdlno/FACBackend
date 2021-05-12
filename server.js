import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors())

app.get('/', function (req, res) {
  res.send('hello world')
  console.log('Server is listening on port 69420')
})

app.listen(69420)