const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  brand: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand', required: true },
  quantity: { type: Number, required: true, default: 0 }, // Trường quantity để quản lý số lượng
  image: { type: String },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Product', productSchema);
