import mongoose, { Schema } from "mongoose";

const productsSchema = new Schema(
  {
    id: Number,
    name: String,
    description: String,
    total_price: Number,
    category: String,
  },
  {
    timestamps: true,
  }
);

const Products = mongoose.models.Topic || mongoose.model("Products", productsSchema);

export default Products;