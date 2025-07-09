const mongoose = require('mongoose');

const submenuSchema = new mongoose.Schema({
  name: String,
  price: Number,
  available: {
    type: Boolean,
    default: true
  },
  menuId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Menu',
    required: true
  }
});

module.exports = mongoose.model('Submenu', submenuSchema);
