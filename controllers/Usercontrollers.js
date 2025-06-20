const bcrypt = require('bcryptjs');
const User = require('../models/UserModel');
const { response } = require('express');

// Register user
const userRegister = async (req, res) => {
  try {
    const { gmail, password, mobile, username } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ gmail });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      gmail,
      password: hashedPassword,
      mobile,
      username,
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully', user: newUser });

  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};

// Login user
const userLogin = async (req, res) => {
  try {
    const { gmail, password } = req.body;

    const user = await User.findOne({ gmail });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Login successful', user });

  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};

//Logout user
const userLogout=async(req,res)=>{
    try{
res.status(200).json({message:'user logged out successfully'})
    }catch(error){
        res.status(500).json({message:'error logging out'})
    }
    
}

// Getallusers
const getallusers=async(req,res)=>{
    try{
    const users=await User.find()
    res.status(200).json({users})
    }catch(error){
        res.status(500).json({message:'error fetching errors'})
    }
}
// const getuserbyid=async(req,res)=>{
//     try {
//        const user=await User.findById(req.params.id)
//        if(!user) return res.status(404).json({message:'user not found'})
//         res.status(200).json({user}) 
//     } catch (error) {
        
//     }
// }

//updateuser
const updateuser=async(req,res)=>{
    try {
        const updateuser=await User.findByIdAndUpdate(req.params.id,req.body,{new:true})
        if(!updateuser) return res.status(200).json({message:"user not found"})
            res.status(200).json({message:'user updated',user:updateuser})
    } catch (error) {
        res.status(500).json({message:'error update user',error:error.message})
    }
}

//Deleteuser
const deleteuser =async(req,res)=>{
    try {
        const deleteuser =await User.findByIdAndDelete(req.params.id)
        if(!deleteuser) return res.status(404).json({message:'user not found'})
            res.status(200).json({message:'user deleted',user:deleteuser})
    } catch (error) {
        res.status(500).json({message:'error deleting user',error:error.message})
    }
}

// Passwordchange
const changePassword = async (req, res) => {
  try {
    const { gmail, oldPassword, newPassword } = req.body;

    const user = await User.findOne({ gmail });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    console.log("Is password match:", isMatch);
    if (!isMatch) return res.status(400).json({ message: 'Old password incorrect' });

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();

    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error changing password', error: error.message });
  }
};



module.exports = {
  userRegister,
  userLogin,
  userLogout,
  getallusers,
  // getuserbyid,
  updateuser,
  deleteuser,
  changePassword,
};
