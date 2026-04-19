import { addToCartService } from "../services/cart.service.js";
import { store } from "../store/store.js";
import { checkoutService } from "../services/order.service.js";

describe("Checkout Service", () => {
  beforeEach(() => {
    store.cart = [
      { id: "1", name: "Shoes", price: 100, quantity: 2 },
    ];

    store.orders = [];
    store.discounts = [];
    store.stats = {
      totalRevenue: 0,
      totalItems: 0,
      totalDiscount: 0,
      totalOrders: 0,
    };
  });

  test("should create order successfully", () => {
    const result = checkoutService();

    expect(result.order).toBeDefined();
    expect(store.cart.length).toBe(0); 
  });

  test("should calculate total correctly", () => {
    const result = checkoutService();

    expect(result.order.total).toBe(200);
  });
});