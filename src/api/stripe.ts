import { CartItem } from "@/store/cart";
import { query, redirect } from "@solidjs/router";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const redirectProd = () => {
  if (process.env.NODE_ENV !== "development") {
    throw redirect("/");
  }
};

type PriceResponse = Stripe.Response<Stripe.Price>;
export type PriceWithProduct = PriceResponse & { product: Stripe.Product };

const isExpandedProduct = (
  product: Stripe.Price["product"],
): product is Stripe.Product =>
  typeof product === "object" && product !== null && !("deleted" in product);

const isPriceWithProduct = (price: PriceResponse): price is PriceWithProduct =>
  isExpandedProduct(price.product);

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

export const getPrices = query(
  async (ids: string[]): Promise<PriceWithProduct[]> => {
    "use server";
    redirectProd();
    const prices = await Promise.all(
      ids.map((id) => stripe.prices.retrieve(id, { expand: ["product"] })),
    );
    const expanded = prices.filter(isPriceWithProduct);
    if (expanded.length !== prices.length) {
      throw new Error("Some prices are missing expanded products.");
    }
    return expanded;
  },
  "prices",
);

export const createPaymentIntent = query(async (items: CartItem[]) => {
  "use server";
  if (!items.length) throw new Error("Cart is empty.");
  const normalized = items.map((item) => ({
    priceId: item.priceId,
    quantity: Math.max(1, Math.floor(item.quantity)),
  }));

  const prices = await Promise.all(
    normalized.map((item) => stripe.prices.retrieve(item.priceId)),
  );

  const currency = prices[0]?.currency;
  if (!currency) throw new Error("Missing currency.");
  const amount = prices.reduce((sum, price, i) => {
    if (!price.unit_amount) throw new Error("Missing unit_amount");
    if (price.currency !== currency) {
      throw new Error("Mixed currencies are not supported.");
    }
    return sum + price.unit_amount * normalized[i].quantity;
  }, 0);

  const intent = await stripe.paymentIntents.create({
    amount,
    currency,
    automatic_payment_methods: { enabled: true },
  });

  if (!intent.client_secret) {
    throw new Error("Missing client_secret.");
  }

  return { clientSecret: intent.client_secret };
}, "createPaymentIntent");
