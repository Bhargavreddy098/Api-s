const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  items: [
    {
      itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu', required: true },
      quantity: { type: Number, required: true },
      price:Number
    }
  ],
  totalAmount:Number,
   branch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Branch',
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'userlogins',
    required: true
  },
  assignedToChef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'userlogins',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'cooking', 'ready', 'delivered'],
    default: 'pending'
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
