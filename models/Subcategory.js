const mongoose = require('mongoose')
const subcategoryschema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Category',
        require: true
    },
   brand: String,
  price: Number,
  description: String,
  image: String,
})
module.exports = mongoose.model('Subcategory', subcategoryschema)