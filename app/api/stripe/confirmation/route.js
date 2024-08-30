import Stripe from "stripe";

export const POST = async (req, res) => {
  try {
    const { Id } = await req.json();
    const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
    const session = await stripe.checkout.sessions.retrieve(Id);
    return new Response(JSON.stringify(session.status), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
};
