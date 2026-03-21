import Order from "../models/Order.js";

// POST /api/orders - Create a new order
export const createOrder = async (req, res) => {
  try {
    const { items, total } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No order items found" });
    }

    const order = new Order({
      user: req.user._id, // Gotten from protect middleware
      items,
      total,
      status: "Paid",
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/orders - Get logged in user's order history
export const getUserOrders = async (req, res) => {
  try {
    // Fetch orders for this user and sort by newest first
    const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
