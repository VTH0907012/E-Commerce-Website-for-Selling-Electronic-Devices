import React from "react";

const features = [
  {
    icon: "fas fa-truck",
    title: "Miễn phí vận chuyển",
    description: "Cho đơn hàng từ 500K",
  },
  {
    icon: "fas fa-shield-alt",
    title: "Bảo hành 6 tháng",
    description: "Áp dụng cho toàn bộ sản phẩm",
  },
  {
    icon: "fas fa-undo",
    title: "Đổi trả dễ dàng",
    description: "Trong vòng 7 ngày",
  },
  {
    icon: "fas fa-headset",
    title: "Hỗ trợ 24/7",
    description: "Tư vấn nhanh chóng",
  },
];

const ServiceFeatures = () => {
  return (
    <div className="py-4 px-4 mt-5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {features.map((item, index) => (
          <div key={index} className="flex flex-col items-center space-y-2">
            <i className={`${item.icon} text-2xl text-blue-600`}></i>
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="text-gray-600 text-sm">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceFeatures;
