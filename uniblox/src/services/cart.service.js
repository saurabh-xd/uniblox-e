import { store } from "../store/store.js";

export const addToCartService = (item) => {
  const existingItem = store.cart.find((i) => i.id === item.id);

  if (existingItem) {
    existingItem.quantity += item.quantity;
  } else {
    store.cart.push(item);
  }

  return store.cart;
};

export const getCartService = () => {
  return store.cart;
};