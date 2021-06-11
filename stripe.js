require('dotenv').config()
const secret_key = process.env.SECRET_KEY
const stripe = require('stripe')(secret_key);

const charge =  async (req, res) => {
  const { id, amount, receipt_email, description } = req.body;

  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: description,
      payment_method: id,
      receipt_email: receipt_email,
      statement_descriptor_suffix: 'Fremont Arts Council',
      confirm: true
    });

    return res.send(payment)

  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      message: error.message
    });
  }
};

module.exports = { charge }