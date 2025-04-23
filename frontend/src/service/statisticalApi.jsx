import api from "../utils/api";

// Hàm gọi API lấy doanh thu theo tháng
export const getRevenueByMonth = async () => {
  try {
    const response = await api.get('/api/orders/revenue-by-month');
    return response.data.revenueData;
  } catch (error) {
    console.error('Lỗi khi lấy doanh thu:', error);
    throw error;
  }
};
