require('dotenv').config()
const nodemailer = require('nodemailer')

const email_user = process.env.EMAIL_USER
const email_pass = process.env.EMAIL_PASS


const sendMail = (req, res) => {
  console.log('send mail has been called')
  console.log(email_user, email_pass)
  let name = req.body.name
  let email = req.body.email
  let message = req.body.message
  let subject = req.body.subject
  let recipient = req.body.recipient

  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: email_user,
      pass: email_pass
    }
  })

  const mailParams = {
    from: name,
    to: recipient,
    subject: subject,
    html: `Sender Name: ${name} <br /> Sender Email: ${email} <br /><br /> Message Content: <br />${message}`
  }

  transporter.sendMail(mailParams, (err) => {
    if (err) {
      res.json({
        status: err
      })
      console.log(res.json)
    } else {
      res.json({
        status: "success"
      })
      // console.log(res.json)
    }
  })

  transporter.verify(function (err, success) {
    if (err) {
      console.log(err)
    } else {
      console.log(success, req.body)
    }
  })
}

module.exports = { sendMail }