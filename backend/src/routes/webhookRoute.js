import express from "express";
import Stripe from "stripe";
import {Subscription} from "../models/Subscription.js";
import {User} from "../models/User.js";

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/", async (req, res) => {
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      req.headers["stripe-signature"],
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch {
    return res.status(400).send("Invalid signature");
  }

  if (event.type === "customer.subscription.created" ||
      event.type === "customer.subscription.updated") {

    const s = event.data.object;

    // find user by Stripe customer ID
    const user = await User.findOne({ stripeCustomerId: s.customer });
    if (!user) return res.json({ received: true });

    await Subscription.findOneAndUpdate(
      { stripeSubscriptionId: s.id },
      {
        user: user._id,
        stripeSubscriptionId: s.id,
        stripeCustomerId: s.customer,
        status: s.status,
        currentPeriodEnd: new Date(s.current_period_end * 1000)
      },
      { upsert: true }
    );
  }

  if (event.type === "customer.subscription.deleted") {
    const s = event.data.object;
    await Subscription.findOneAndUpdate(
      { stripeSubscriptionId: s.id },
      { status: "canceled" }
    );
  }

  res.json({ received: true });
});

export default router;
