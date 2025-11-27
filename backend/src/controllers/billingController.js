import Stripe from "stripe";
import { Subscription } from "../models/Subscription.js";
import { User} from "../models/User.js";
import { PRICE_MAP } from "../utils/priceMap.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const checkout = async (req, res) => {
  const { planId } = req.body;
  
  const user = await User.findById(req.user?.userId);
  console.log("user",user);

  const priceId = PRICE_MAP[planId];
   if (!priceId) {
    return res.status(400).json({ error: "Invalid plan ID" });
  }

  let stripeCustomerId = user.stripeCustomerId;

  if (!stripeCustomerId) {
    const c = await stripe.customers.create({
      email: user.email,
      metadata: { userId: user._id.toString() },
    });
    stripeCustomerId = c.id;
    await User.findByIdAndUpdate(user._id, { stripeCustomerId });
  }

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer: stripeCustomerId,
    line_items: [
      { price: priceId, quantity: 1 }
    ],
    success_url: `${FRONTEND_URL}/success`,
    cancel_url: `${FRONTEND_URL}/cancel`,
  });

  res.json({ url: session.url });
};
