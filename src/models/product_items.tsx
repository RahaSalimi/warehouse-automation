import mongoose, { Schema } from "mongoose";

const productItemssSchema = new Schema(
  {
    id: Number,
    product_id: Number,
    line_item_id: Number,
    quantity: Number,
 
  },
  {
    timestamps: true,
  }
);

const ProductItems = mongoose.models.Topic || mongoose.model("ProductItems", productItemssSchema);

export default ProductItems;