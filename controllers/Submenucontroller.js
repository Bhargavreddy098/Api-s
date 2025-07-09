const submenu=require('../models/Submenumodel')
const createsubmenu = async (req, res) => {
  const menuId = req.params.menuId  ;
  const { name, price, available } = req.body;

  try {
    const newSubmenu = await submenu.create({
      name,
      price,
      available,
      menuId
    });

    res.status(200).json(newSubmenu);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create submenu', error: err.message });
  }
};



const getSubmenus = async (req, res) => {
  const { menuId } = req.params;

  try {
    const submenus = await submenu.find({ menuId }).populate('menuId', 'name');
    res.status(200).json(submenus);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch submenus', error: error.message });
  }
};



const updateSubmenu = async (req, res) => {
  const { id } = req.params;
  const { name, price, available } = req.body;

  try {
    const updated = await submenu.findByIdAndUpdate(
      id,
      { name, price, available },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Submenu not found' });
    }

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update submenu', error: error.message });
  }
};



const deleteSubmenu = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await submenu.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: 'Submenu not found' });
    }

    res.status(200).json({ message: 'Submenu deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete submenu', error: error.message });
  }
};

module.exports={createsubmenu,getSubmenus,updateSubmenu,deleteSubmenu}