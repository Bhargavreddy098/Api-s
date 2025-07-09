const MainAdmin = require('../models/Mainadmin');
const bcrypt = require('bcrypt');

// Create main admin (one-time setup)
exports.createMainAdmin = async (req, res) => {
  try {
    const existingMainAdmin = await MainAdmin.findOne({ role: 'main-admin' });

    if (existingMainAdmin) {
      return res.status(400).json({ message: 'Main admin already exists' });
    }

    const { username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const mainAdmin = await MainAdmin.create({
      username,
      password: hashedPassword,
    });

    res.status(201).json({ message: 'Main admin created successfully', mainAdmin });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get main admin
exports.getMainAdmin = async (req, res) => {
  try {
    const mainAdmin = await MainAdmin.findOne({ role: 'main-admin' }).select('-password');

    if (!mainAdmin) {
      return res.status(404).json({ error: 'Main admin not found' });
    }

    res.status(200).json({ mainAdmin });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update password
exports.updateMainAdminPassword = async (req, res) => {
  try {
    const { password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const mainAdmin = await MainAdmin.findOneAndUpdate(
      { role: 'main-admin' },
      { password: hashedPassword },
      { new: true }
    );

    if (!mainAdmin) {
      return res.status(404).json({ error: 'Main admin not found' });
    }

    res.status(200).json({ message: 'Password updated successfully', mainAdmin });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// POST /loginMainAdmin
exports.loginMainAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await MainAdmin.findOne({ username });

    if (!admin) {
      return res.status(401).json({ error: 'Invalid username' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Optionally remove password from response
    const { password: _, ...adminData } = admin.toObject();

    res.status(200).json({ user: adminData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
