import { addToCartService, getCartService } from "../services/cart.service.js";

export const addToCart = (req, res) => {
  try {
    const { id, name, price, quantity } = req.body;

    if (!id || !name || !price || !quantity) {
      return res.status(400).json({ message: "All fields required" });
    }

    const cart = addToCartService({ id, name, price, quantity });

    res.json({ message: "Item added", cart });
  } catch (error) {
    res.status(500).json({ message: "Error adding item" });
  }
};

export const getCart = (req, res) => {
  const cart = getCartService();
  res.json(cart);
};