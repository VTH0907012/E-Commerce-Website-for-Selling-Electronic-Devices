const mongoose = require("mongoose");

// const orderSchema = new mongoose.Schema({
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//   },
//   shippingInfo: {
//     fullName: String,
//     address: String,
//     phone: String,
//     paymentMethod: String,
//   },
//   items: [
//     {
//       productId: mongoose.Schema.Types.ObjectId,
//       name: String,
//       image: String,
//       price: Number,
//       quantity: Number,
//     }
//   ],
//   total: Number,
//   status: {
//     type: String,
//     default: 'pending', // pending, confirmed, shipped, delivered, canceled
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// module.exports = mongoose.model('Order', orderSchema);

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  shippingInfo: {
    fullName: String,
    phone: String,
    address: String,
    note: String,
    paymentMethod: String,

  },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: Number,
    },
  ],
  total: Number,
  status: {
    type: String,
    enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model("Order", orderSchema);
