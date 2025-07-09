const mongoose=require('mongoose');
const branchSchema=new mongoose.Schema({
    name:String,
    location:String,
    adminId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'userlogins'
    },
    chefId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'userlogins'
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'userlogins'
    },
})
module.exports=mongoose.model('Branch',branchSchema)