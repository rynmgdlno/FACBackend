const nodemailer = require('nodemailer')

const sendMail = (req, res, emailCredentials) => {
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
}

module.exports = { sendMail }