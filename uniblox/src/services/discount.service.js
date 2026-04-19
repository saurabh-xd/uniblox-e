import { store } from "../store/store.js";

// validate discount code
export const validateDiscount = (code) => {
  if (!code) return { valid: false, discount: 0 };

  const discount = store.discounts.find(
    (d) => d.code === code && !d.isUsed
  );

  if (!discount) {
    return { valid: false, discount: 0 };
  }

  return { valid: true, discount: discount.percentage };
};

// mark discount used
export const markDiscountUsed = (code) => {
  const discount = store.discounts.find((d) => d.code === code);
  if (discount) {
    discount.isUsed = true;
  }
};

// generate discount (nth order logic)
export const generateDiscountIfEligible = () => {
  const N = 3; // every 3rd order
  const DISCOUNT_PERCENT = 10;

  if (store.stats.totalOrders % N === 0) {
    const newCode = `SAVE${Date.now()}`;

    store.discounts.push({
      code: newCode,
      percentage: DISCOUNT_PERCENT,
      isUsed: false,
    });

    return newCode;
  }

  return null;
};