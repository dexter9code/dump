import express from 'express';
import Stripe from 'stripe';

const stripe = new Stripe(
  'sk_test_51LIBpPSB6X3CnjxjCOl3pjiSaomnXNhmgKmcPpapvL9yuXF4uSYXct1Xu858S0lcMSDODUXTLyKmwZ1wjBpJTomD007wL2BUxF',
  {apiVersion: '2022-11-15', typescript: true},
);
``;

const app = express();
app.use(express.json());

app.post(`/create-payment`, async (req, res, next) => {
  const customers = await stripe.customers.list();
  const customer = customers.data[0];
  const {planId} = req.body;
  // console.log(customers);
  console.log(customer);

  if (!customer) {
    return res.send({
      error: `You have no customer created for now`,
    });
  }

  const ephemeralKey = await stripe.ephemeralKeys.create(
    {customer: customer.id},
    {apiVersion: '2022-11-15'},
  );

  let paymentInit;
  if (planId === '1') {
    paymentInit = await stripe.paymentIntents.create({
      amount: 10000,
      currency: 'inr',
      // automatic_payment_methods: {enabled: true},
      customer: customer.id,
      payment_method_types: ['card'],
    });
  } else if (planId === '2') {
    paymentInit = await stripe.paymentIntents.create({
      amount: 20000,
      currency: 'inr',
      // automatic_payment_methods: {enabled: true},
      customer: customer.id,
      payment_method_types: ['card'],
    });
  } else {
    paymentInit = await stripe.paymentIntents.create({
      amount: 5000,
      currency: 'inr',
      // automatic_payment_methods: {enabled: true},
      customer: customer.id,
      payment_method_types: ['card'],
    });
  }

  console.log(paymentInit.client_secret, ephemeralKey.secret);

  res.send({
    clientSecret: paymentInit.client_secret,
    ephemeralKey: ephemeralKey.secret,
    customer: customer.id,
  });
});
``;

app.listen(3000, () => console.log(`listening on local host 3000`));
