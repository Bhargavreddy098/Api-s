const Menu = require('../models/Menu');
const Order = require('../models/Order');
const UserLogin = require('../models/Userlogin');

exports.createOrder = async (req, res) => {
  try {
    const { items, branch, createdBy, assignedToChef } = req.body;

    const user = await UserLogin.findById(createdBy);
    const chef = await UserLogin.findById(assignedToChef);

    if (!user || !chef) {
      return res.status(400).json({ error: 'Invalid user or chef ID' });
    }

    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      const menuItem = await Menu.findById(item.itemId);
      if (!menuItem) continue;

      const price = menuItem.price;
      const quantity = item.quantity;

      totalAmount += price * quantity;

      orderItems.push({
        itemId: item.itemId,
        quantity,
        price,
      });
    }

    const order = await Order.create({
      items: orderItems,
      totalAmount,
      branch,
      createdBy,
      assignedToChef,
    });

    res.status(201).json({ message: 'Order created successfully', order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('items.itemId', 'name ')
      .populate('branch', 'name')
      .populate('createdBy', 'username')
      .populate('assignedToChef', 'username');

    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id)
      .populate('branch', 'name')
      .populate('createdBy', 'username')
      .populate('assignedToChef', 'username');

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.status(200).json({ order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { items, branch, createdBy, assignedToChef, status } = req.body;

    const order = await Order.findByIdAndUpdate(
      id,
      { items, branch, createdBy, assignedToChef, status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.status(200).json({ message: 'Order updated successfully', order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findByIdAndDelete(id);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getOrderStats = async (req, res) => {
  try {
    const orders = await Order.find();

    const totalRevenue = orders.reduce((acc, order) => acc + (order.totalAmount || 0), 0);
    const totalOrders = orders.length;

    res.status(200).json({ totalRevenue, totalOrders });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getTopSellingItems=async(req,res)=>{
  try {
    const topItems=await Order.aggregate([
      {
        $unwind:'$items'
      },
      {
        $group:{
          _id:'$items.itemId',
          totalSold:{$sum:'$items.quantity'}
        }
      },
      {
        $lookup:{
          from:'menus',
          localField:'_id',
          foreignField:'_id',
          as:'item'
        }
      },
      {$unwind:'$item'},
      {
        $project:{
          name:'$item.name',
          totalSold:1
        }
      },
      {$sort:{totalSold:-1}},
      {$limit:5}
    ])
    res.status(200).json(topItems)
  } catch (error) {
    res.status(500).json({error:error.message})
  }
}
