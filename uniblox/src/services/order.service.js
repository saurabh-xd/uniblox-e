import { store } from "../store/store.js";
import {
  validateDiscount,
  markDiscountUsed,
  generateDiscountIfEligible,
} from "./discount.service.js";

export const checkoutService = (discountCode) => {
  if (store.cart.length === 0) {
    throw new Error("Cart is empty");
  }

  //  calculate total
  let total = 0;

  store.cart.forEach((item) => {
    total += item.price * item.quantity;
  });

  let discountAmount = 0;

  //  apply discount
  const { valid, discount } = validateDiscount(discountCode);

  if (valid) {
    discountAmount = (total * discount) / 100;
    markDiscountUsed(discountCode);
  }

  const finalAmount = total - discountAmount;

  // create order
  const order = {
    id: Date.now().toString(),
    items: [...store.cart],
    total,
    discountAmount,
    finalAmount,
  };

  store.orders.push(order);

  //  update stats
  store.stats.totalRevenue += finalAmount;
  store.stats.totalItems += store.cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  store.stats.totalDiscount += discountAmount;
  store.stats.totalOrders += 1;

  // generate coupon if eligible
  const newCoupon = generateDiscountIfEligible();

  // clear cart
  store.cart = [];

  return {
    order,
    newCoupon,
  };
};