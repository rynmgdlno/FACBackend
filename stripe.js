// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
const stripe = require('stripe')('sk_test_51IsCuEBBSrRv5J3ZCa...ItpEWHnMi00j3w0nGzC''sk_test_51IsCuEBBSrRv5J3ZCa9gBzgkUssacOKJcpCUuirhRVK0ZG1IoCbZ5LaDgeIkKJg3OfohbrJVeyVPAGSItpEWHnMi00j3w0nGzC');

const paymentIntent = await stripe.paymentIntents.create({
  amount: 1000,
  currency: 'usd',
  payment_method_types: ['card'],
  receipt_email: 'jenny.rosen@example.com',
});

paymentIntent()