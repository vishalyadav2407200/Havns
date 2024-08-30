import Stripe from "stripe";

export const POST = async (req, res) => {
  try {
    const { title, amount, Id, dates } = await req.json();
    const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "INR",
            product_data: {
              name: title,
            },
            unit_amount: amount * 100,
          },
          quantity: 1,
        },
      ],
      billing_address_collection: "required",
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/protected/paymentConf?hall_id=${Id}&checkout_id={CHECKOUT_SESSION_ID}&start=${dates.start}&end=${dates.end}`,
      cancel_url: `${process.env.CLIENT_URL}/protected/paymentConf?hall_id=${Id}`,
    });
    return new Response(JSON.stringify(session), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
};
