// nodemailer example

import nodemailer from 'nodemailer'

async function main() {
  // let testAccount = await nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: 'monserrat.morissette77@ehtereal.email',
      pass: 'PJhyvQXCdpXUrc27K5',
    },
  })

  let info = await transporter.sendMail({
    from: '"Fred Foo" <foo@example.com>',
    to: "bar@example.com",
    subject: "Hello",
    text: "Hello world?",
    html: "<b>Hello world with HTML?</b>"
  })

  console.log("message sent: %s", info.messageId)
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info))
}

main().catch(console.error)