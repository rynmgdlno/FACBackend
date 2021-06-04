const stripe = require('stripe')('sk_test_51IsCuEBBSrRv5J3ZCa9gBzgkUssacOKJcpCUuirhRVK0ZG1IoCbZ5LaDgeIkKJg3OfohbrJVeyVPAGSItpEWHnMi00j3w0nGzC');

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