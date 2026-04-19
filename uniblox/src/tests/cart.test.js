import { addToCartService } from "../services/cart.service.js";
import { store } from "../store/store.js";

describe("Cart Service", () => {
  beforeEach(() => {
    store.cart = [];
  });

  test("should add item to cart", () => {
    addToCartService({
      id: "1",
      name: "Shirt",
      price: 100,
      quantity: 1,
    });

    expect(store.cart.length).toBe(1);
  });

  test("should increase quantity if item exists", () => {
    addToCartService({
      id: "1",
      name: "Shirt",
      price: 100,
      quantity: 1,
    });

    addToCartService({
      id: "1",
      name: "Shirt",
      price: 100,
      quantity: 2,
    });

    expect(store.cart[0].quantity).toBe(3);
  });
});