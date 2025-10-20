import { query } from "@solidjs/router";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const getProducts = query(async () => {
  "use server";
  const { data } = await stripe.products.list();
  return data;
}, "products");

export const getProduct = query(async (id: string) => {
  "use server";
  const product = await stripe.products.retrieve(id);
  return product;
}, "products:id");

export const getPrices = query(async () => {
  "use server";
  const { data } = await stripe.prices.list();
  return data;
}, "prices");
