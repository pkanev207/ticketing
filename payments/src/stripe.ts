import Stripe from "stripe";
// this is a class and to use it we have to make an instance

export const stripe = new Stripe(process.env.STRIPE_KEY!, {
  apiVersion: "2022-11-15",
});
