import mongoose from "mongoose";
import Product from "../models/Product.js";

export const create = async (req, res) => {
  try {
    const { name, slug, description, price, imageUrl } = req.body;

    const productExists = await Product.findOne({ slug });
    if (productExists)
      return res.status(400).json({ message: "Product Already Exists." });

    // NEW: added imageUrl to creation
    const product = await Product.create({
      name,
      slug,
      description,
      price,
      imageUrl,
    });
    res.status(201).json({ message: "Product Listed Successfully", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const { objectId } = req.params;
    const { name, slug, description, price, imageUrl } = req.body;

    const productFields = {
      name,
      slug,
      description,
      price,
      imageUrl,
    };

    const product = await Product.updateOne(
      { _id: new mongoose.Types.ObjectId(objectId) },
      { $set: productFields },
    );

    res.status(200).json({ message: "Product Updated Successfully", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAll = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const remove = async (req, res) => {
  try {
    const { objectId } = req.params;
    await Product.findByIdAndDelete(new mongoose.Types.ObjectId(objectId));
    res.status(200).json({ message: "Product Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
