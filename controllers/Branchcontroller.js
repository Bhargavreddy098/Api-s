const Branch = require('../models/Branch');
const UserLogin = require('../models/Userlogin');

exports.createBranch = async (req, res) => {
  try {
    const { name, location, adminId, chefId, userId } = req.body;

    // Validate that the sub-admin, chef, and user exist
    const subAdmin = await UserLogin.findById(adminId);
    const chef = await UserLogin.findById(chefId);
    const user = await UserLogin.findById(userId);

    if (!subAdmin || !chef || !user) {
      return res.status(400).json({ error: 'Invalid sub-admin, chef, or user ID' });
    }

    // Create the branch
    const branch = await Branch.create({
      name,
      location,
      adminId,
      chefId,
      userId,
    });

    res.status(201).json({ message: 'Branch created successfully', branch });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getAllBranches = async (req, res) => {
  try {
    const branches = await Branch.find()
      .populate('adminId', 'username')
      .populate('chefId', 'username')
      .populate('userId', 'username');

    res.status(200).json({ branches });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getBranchById = async (req, res) => {
  try {
    const { id } = req.params;

    const branch = await Branch.findById(id)
      .populate('adminId', 'username')
      .populate('chefId', 'username')
      .populate('userId', 'username');

    if (!branch) {
      return res.status(404).json({ error: 'Branch not found' });
    }

    res.status(200).json({ branch });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.updateBranch = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, location, adminId, chefId, userId } = req.body;

    const branch = await Branch.findByIdAndUpdate(
      id,
      { name, location, adminId, chefId, userId },
      { new: true }
    );

    if (!branch) {
      return res.status(404).json({ error: 'Branch not found' });
    }

    res.status(200).json({ message: 'Branch updated successfully', branch });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.deleteBranch = async (req, res) => {
  try {
    const { id } = req.params;

    const branch = await Branch.findByIdAndDelete(id);

    if (!branch) {
      return res.status(404).json({ error: 'Branch not found' });
    }

    res.status(200).json({ message: 'Branch deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};