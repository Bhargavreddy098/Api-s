const Menu = require('../models/Menu');
const UserLogin = require('../models/Userlogin');

exports.createMenuItem = async (req, res) => {
  try {
    const { name, price, category, branch, createdBy } = req.body;

    // Validate that the user creating the menu item exists
    
    if (!name || !price || !category || !branch || !createdBy) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }

    // Create the menu item
    const menuItem = await Menu.create({
      name,
      price,
      category,
      branch,
      createdBy,
    });
    await menuItem.save()
    res.status(201).json({ message: 'Menu item created successfully', menuItem });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getAllMenuItems = async (req, res) => {
  try {
    const menuItems = await Menu.find()
    .populate('branch', 'name')
    .populate('createdBy', 'username');

    res.status(200).json({ menuItems });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMenuItemById = async (req, res) => {
  try {
    const { id } = req.params;

    const menuItem = await Menu.findById(id).populate('branch', 'name').populate('createdBy', 'username');

    if (!menuItem) {
      return res.status(404).json({ error: 'Menu item not found' });
    }

    res.status(200).json({ menuItem });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, category, branch, createdBy } = req.body;

    const menuItem = await Menu.findByIdAndUpdate(
      id,
      { name, price, category, branch, createdBy },
      { new: true }
    );

    if (!menuItem) {
      return res.status(404).json({ error: 'Menu item not found' });
    }

    res.status(200).json({ message: 'Menu item updated successfully', menuItem });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.deleteMenuItem = async (req, res) => {
  try {
    const { id } = req.params;

    const menuItem = await Menu.findByIdAndDelete(id);

    if (!menuItem) {
      return res.status(404).json({ error: 'Menu item not found' });
    }

    res.status(200).json({ message: 'Menu item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};