import mongoose, { Schema } from "mongoose";

const lineItemssSchema = new Schema(
  {
    id: Number,
    name: String,
    description: String,
    price: Number,
    total_stock: Number
 
  },
  {
    timestamps: true,
  }
);

const LineItems = mongoose.models.Topic || mongoose.model("LineItems", lineItemssSchema);

export default LineItems;