import { Line } from 'react-chartjs-2';
import { useState, useEffect } from 'react';
import { getRevenueByMonth } from '../service/statisticalApi'; // Import hàm gọi API
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Đăng ký các thành phần cần thiết cho chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const RevenueChart = () => {
  const [revenueData, setRevenueData] = useState([]);

  useEffect(() => {
    // Sử dụng hàm getRevenueByMonth để lấy dữ liệu
    getRevenueByMonth()
      .then(data => {
        setRevenueData(data);
      })
      .catch(error => {
        console.error('Lỗi khi lấy doanh thu:', error);
      });
  }, []);

  const chartData = {
    labels: revenueData.map(data => `${data._id.month}-${data._id.year}`),
    datasets: [
      {
        label: 'Doanh thu',
        data: revenueData.map(data => data.totalRevenue),
        fill: true, // Để có phần nền phía dưới đường vẽ
        backgroundColor: 'rgba(75, 192, 192, 0.2)', // Màu nền của đường vẽ
        borderColor: 'rgb(75, 192, 192)', // Màu của đường vẽ
        borderWidth: 2, // Độ dày của đường vẽ
        tension: 0.1, // Để có đường cong
      },
    ],
  };

  const options = {
    responsive: true, // Để biểu đồ tự động thay đổi kích thước khi thay đổi kích thước màn hình
    maintainAspectRatio: false, // Để biểu đồ thay đổi tỷ lệ theo kích thước container
    plugins: {
      title: {
        display: true,
        text: 'Doanh thu theo tháng',
        font: {
          size: 20,
          weight: 'bold',
        },
      },
      tooltip: {
        backgroundColor: '#333', // Màu nền của tooltip
        titleColor: 'white', // Màu chữ tiêu đề tooltip
        bodyColor: 'white', // Màu chữ nội dung tooltip
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          //text: 'Tháng-Năm',
          font: {
            size: 14,
          },
        },
      },
      y: {
        title: {
          display: true,
          text: 'Doanh thu (VND)',
          font: {
            size: 14,
          },
        },
      },
    },
    interaction: {
      mode: 'nearest', // Để các tooltip xuất hiện gần nhất khi hover vào điểm
    },
  };

  return (
    <div className="chart-container" style={{ width: '95%', height: '400px', margin: '0 auto' }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default RevenueChart;
