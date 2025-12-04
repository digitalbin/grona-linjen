import Stripe from "stripe";

export function toPrice(price: Stripe.Product["default_price"]): string {
  if (!price || typeof price !== "object") return "N/A";
  const unitAmount = price.unit_amount;
  if (unitAmount === null || unitAmount === undefined) return "N/A";
  return `${unitAmount / 100} spänn`;
}
