import { createDiscount, getStats } from "../services/admin.service.js";

export const generateDiscount = (req, res) => {
  try {
    const { percentage } = req.body;

    if (!percentage) {
      return res.status(400).json({ message: "Percentage required" });
    }

    const discount = createDiscount(percentage);

    res.json({
      message: "Discount created",
      discount,
    });
  } catch (error) {
    res.status(500).json({ message: "Error generating discount" });
  }
};

export const stats = (req, res) => {
  try {
    const data = getStats();

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching stats" });
  }
};