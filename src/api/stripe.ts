import { query, redirect } from "@solidjs/router";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const redirectProd = () => {
  if (process.env.NODE_ENV !== "development") {
    throw redirect("/");
  }
};

export const getProducts = query(async () => {
  "use server";
  redirectProd();
  const { data } = await stripe.products.list({
    expand: ["data.default_price"],
  });
  const h = Array.from({ length: 10 }, () => data[0]);
  return h;
}, "products");

export const getProduct = query(async (id: string) => {
  "use server";
  redirectProd();
  const product = await stripe.products.retrieve(id);
  return product;
}, "products:id");
