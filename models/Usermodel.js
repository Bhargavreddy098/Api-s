const mongoose=require('mongoose')
const userschema= new mongoose.Schema({
    gmail: {
        type:String,
        required:true,
        
    },
    password: {
        type:String,
        required:true
    },
    mobile: {
        type:String,  
    },
    username: {
        type:String
    }
})
module.exports=mongoose.model('user',userschema)