import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "user", 
    required: true 
},
  stripeCustomerId: String,
  stripeSubscriptionId: String,
  status: String,
  currentPeriodEnd: Date,
});

export const Subscription = mongoose.model("subscription", subscriptionSchema);
