import { validateDiscount } from "../services/discount.service.js";
import { store } from "../store/store.js";

describe("Discount Service", () => {
  beforeEach(() => {
    store.discounts = [
      { code: "SAVE10", percentage: 10, isUsed: false },
    ];
  });

  test("should validate correct discount", () => {
    const result = validateDiscount("SAVE10");

    expect(result.valid).toBe(true);
    expect(result.discount).toBe(10);
  });

  test("should reject invalid discount", () => {
    const result = validateDiscount("WRONG");

    expect(result.valid).toBe(false);
  });
});