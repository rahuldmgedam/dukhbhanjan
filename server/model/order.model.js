const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    quantity: { type: Number, required: true },
    quality: { type: String},
    UserId: { type: String, required: true },
    user: { type: String, required: true },
    status: { type: String, default: 'ordered' },
    cancel: { type: String, default: 'process' },
    cancelDate: { type: Date, default: null }, // New field for cancel date
    orderDateTime: { type: Date, default: Date.now, required: true },
    dispatchDate: {type: Date},
    deliveredDate: {type: Date}
  },
  {
    versionKey: false,
  }
);

const OrderModel = mongoose.model("order", orderSchema);

module.exports = {
  OrderModel,
};
