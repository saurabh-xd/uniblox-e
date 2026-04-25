import { checkoutService } from "../services/order.service.js";
import { store } from "../store/store.js";

export const checkout = (req, res) => {
  try {
    const { discountCode } = req.body;

    const result = checkoutService(discountCode);

    if(result.message){
      
      res.status(400).json({
       message: result.message
      
      })

    }

    res.json({
      message: "Order placed successfully",
      ...result,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};