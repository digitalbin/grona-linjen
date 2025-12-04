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
  return data;
}, "products");

export const getProduct = query(async (id: string) => {
  "use server";
  redirectProd();
  const [product, prices] = await Promise.all([
    stripe.products.retrieve(id),
    stripe.prices.list({ product: id }),
  ]);

  return {
    product,
    prices: prices.data,
  };
}, "products:id");
