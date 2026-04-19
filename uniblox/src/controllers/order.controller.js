import { checkoutService } from "../services/order.service.js";

export const checkout = (req, res) => {
  try {
    const { discountCode } = req.body;

    const result = checkoutService(discountCode);

    res.json({
      message: "Order placed successfully",
      ...result,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};