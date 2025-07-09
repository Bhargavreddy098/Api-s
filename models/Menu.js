const mongoose=require('mongoose')
const menuschema= new mongoose.Schema({
    name: String,
    price: Number,
    createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'userlogins',
    required: true
  },
    category: String,
    visibility:[String],
    branch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Branch',
    required: true
  }
    
})
module.exports=mongoose.model('Menu',menuschema)