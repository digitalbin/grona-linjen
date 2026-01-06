import Stripe from "stripe";

export function numberToPrice(amount: number, currency: string): string {
  return new Intl.NumberFormat("sv-SE", {
    style: "currency",
    currency,
  }).format(amount / 100);
}

export function priceToDisplayPrice(
  price: Stripe.Product["default_price"],
): string {
  if (!price || typeof price !== "object") return "N/A";

  const amount = price.unit_amount;
  if (amount === null || amount === undefined) return "N/A";

  const displayPrice = numberToPrice(amount, price.currency);
  return displayPrice;
}

export function getCurrencySlang(): string {
  return "spänn";
}
