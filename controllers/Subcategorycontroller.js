const Subcategory = require('../models/Subcategory');

//  Create subcategory under a product
const createsubcategory = async (req, res) => {
  try {
    const { productId } = req.params;

    const subcategory = new Subcategory({
      ...req.body,
      productId,
    });

    const saved = await subcategory.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create subcategory', error: error.message });
  }
};

//  Get subcategories for a specific product
const getsubcategories = async (req, res) => {
  try {
    const { productId } = req.params;
    const subcategories= await Subcategory.find({ productId });

    res.status(200).json({ subcategories });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch subcategories', error: error.message });
  }
};

//  Update subcategory by its ID
const updatesubcategory = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await Subcategory.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updated) {
      return res.status(404).json({ message: 'Subcategory not found' });
    }

    res.status(200).json({ message: 'Subcategory updated successfully', updated });
  } catch (error) {
    res.status(500).json({ message: 'Error updating subcategory', error: error.message });
  }
};

//  Delete subcategory by ID
const deletesubcategory = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Subcategory.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: 'Subcategory not found' });
    }

    res.status(200).json({ message: 'Deleted successfully', deleted });
  } catch (error) {
    res.status(500).json({ message: 'Delete failed', error: error.message });
  }
};

module.exports = {
  createsubcategory,
  getsubcategories,
  updatesubcategory,
  deletesubcategory,
};
