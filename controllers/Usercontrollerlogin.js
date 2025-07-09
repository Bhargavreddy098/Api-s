const User = require('../models/Userlogin');



exports.createUser = async (req, res) => {
  try {
    const { username, password, role, branch } = req.body;

    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Create the user
    const user = await User.create({
      username,
      password, // Note: Hash the password before saving (use bcrypt or similar)
      role,
      branch:branch || null,
    });

    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate('branch', 'name');

    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).populate('branch', 'name');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, password, role, branch } = req.body;

    // Check if the username is already taken by another user
    const existingUser = await User.findOne({ username, _id: { $ne: id } });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Update the user
    const user = await User.findByIdAndUpdate(
      id,
      { username, password, role, branch },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the password matches (you should hash the password before comparing)
    if (user.password !== password) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Return user details (exclude password in production)
    const { _id, role, branch } = user;

    res.status(200).json({ message: 'Login successful', user: { _id:user._id, username:user.username, role:user.role, branch:user.branch } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getUsersByRole = async (req, res) => {
  try {
    const { role } = req.params;

    const users = await User.find({ role }).populate('branch', 'name');

    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getUsersByBranch = async (req, res) => {
  try {
    const { branchId } = req.params;

    const users = await User.find({ branch: branchId }).populate('branch', 'name');

    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};