const stripe = require('stripe')('sk_test_51IsCuEBBSrRv5J3ZCa9gBzgkUssacOKJcpCUuirhRVK0ZG1IoCbZ5LaDgeIkKJg3OfohbrJVeyVPAGSItpEWHnMi00j3w0nGzC');

const charge =  async (req, res) => {
  const { id, amount } = req.body;

  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: "product description",
      payment_method: id,
      confirm: true
    });

    console.log(payment);

    return res.status(200).json({
      confirm: "abc123"
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: error.message
    });
  }
};

module.exports = { charge }