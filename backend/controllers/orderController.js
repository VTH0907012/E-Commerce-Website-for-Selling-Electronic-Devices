const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
  try {
    const { userId, shippingInfo, items, total } = req.body;

    if (!userId || !shippingInfo || !items || items.length === 0) {
      return res.status(400).json({ message: 'Thông tin đơn hàng không hợp lệ.' });
    }

    const newOrder = new Order({
      userId,
      shippingInfo,
      items,
      total,
    });

    const savedOrder = await newOrder.save();

    res.status(201).json({ message: 'Đặt hàng thành công!', order: savedOrder });
  } catch (err) {
    console.error('Lỗi tạo đơn hàng:', err);
    res.status(500).json({ message: 'Lỗi server khi tạo đơn hàng.' });
  }
};
exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Không tìm thấy đơn hàng.' });
    }

    res.json({ message: 'Cập nhật trạng thái thành công.', order: updatedOrder });
  } catch (err) {
    console.error('Lỗi cập nhật trạng thái:', err);
    res.status(500).json({ message: 'Lỗi server khi cập nhật trạng thái.' });
  }
};
exports.cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ message: 'Không tìm thấy đơn hàng.' });
    }

    if (order.status !== 'pending') {
      return res.status(400).json({ message: 'Chỉ có thể hủy đơn khi đang ở trạng thái "pending".' });
    }

    order.status = 'cancelled';
    const cancelledOrder = await order.save();

    res.json({ message: 'Đơn hàng đã được hủy.', order: cancelledOrder });
  } catch (err) {
    console.error('Lỗi khi hủy đơn:', err);
    res.status(500).json({ message: 'Lỗi server khi hủy đơn hàng.' });
  }
};
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }); // Mới nhất lên đầu
    res.json({ orders });
  } catch (err) {
    console.error('Lỗi lấy danh sách đơn hàng:', err);
    res.status(500).json({ message: 'Lỗi server khi lấy danh sách đơn hàng.' });
  }
};
// controllers/orderController.js

exports.getOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: 'Thiếu userId.' });
    }

    const orders = await Order.find({ userId }).sort({ createdAt: -1 });

    res.json({ orders });
  } catch (err) {
    console.error('Lỗi khi lấy đơn hàng theo userId:', err);
    res.status(500).json({ message: 'Lỗi server khi lấy đơn hàng.' });
  }
};
// controllers/orderController.js
exports.getRevenueByMonth = async (req, res) => {
  try {
    // Group by month and year and calculate total revenue for each month
    const revenueData = await Order.aggregate([
      {
        $match: {
          status: "completed",  // Chỉ lấy các đơn hàng có trạng thái 'completed'
        },
      },
      {
        $project: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
          total: 1,
        },
      },
      {
        $group: {
          _id: { year: "$year", month: "$month" },
          totalRevenue: { $sum: "$total" },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    res.json({ revenueData });
  } catch (err) {
    console.error('Lỗi khi lấy thống kê doanh thu theo tháng:', err);
    res.status(500).json({ message: 'Lỗi server khi lấy thống kê doanh thu theo tháng.' });
  }
};
