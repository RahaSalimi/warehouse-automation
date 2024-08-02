import mongoose, { Schema } from "mongoose";

const ordersSchema = new Schema(
  {
    order_id: Number,
    order_total: Number,
    order_date: String,
    shipping_address: String,
    customer_name: String,
    customer_email: String,
    line_items: Array,
  },
  {
    timestamps: true,
  }
);

const Orders = mongoose.models.Topic || mongoose.model("Orders", ordersSchema);

export default Orders;