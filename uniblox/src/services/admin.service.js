import { store } from "../store/store.js";

export const createDiscount = (percentage) => {
  const code = `ADMIN${Date.now()}`;

  const discount = {
    code,
    percentage,
    isUsed: false,
  };

  store.discounts.push(discount);

  return discount;
};


export const getStats = () => {
  return {
    ...store.stats,
    discounts: store.discounts,
    orders: store.orders.length,
  };
};