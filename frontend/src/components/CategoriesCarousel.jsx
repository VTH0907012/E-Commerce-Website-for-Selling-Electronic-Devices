// export default CategoriesCarousel;
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import { getAllCategories } from "../service/categoryApi"; // Đường dẫn tùy vào vị trí file
import { useNavigate } from "react-router-dom";

const CategoriesCarousel = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryName) => {
    navigate(`/products?category=${encodeURIComponent(categoryName)}`);
  };

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getAllCategories();
        setCategories(res.data); // Đảm bảo API trả về danh sách ở `data`
      } catch (error) {
        console.error("Lỗi khi lấy danh mục:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="py-10 px-4 bg-gradient-to-b from-white to-blue-50 rounded-xl">
      <h2 className="text-3xl font-bold mb-6 text-blue-900 text-center">
        Danh mục sản phẩm
      </h2>
      {categories.length === 0 ? (
        <p className="text-center text-gray-500">
          Không có danh mục để hiển thị
        </p>
      ) : (
        <Swiper
          modules={[Autoplay]}
          spaceBetween={20}
          slidesPerView={2}
          breakpoints={{
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 6 },
          }}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          loop={true}
        >
          {categories.map((cat, index) => (
            <SwiperSlide key={index}>
              <div
                onClick={() => handleCategoryClick(cat.name)}
                className="flex flex-col items-center bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
              >
                <div className="text-3xl mb-2">
                  <img
                    src={`data:image/png;base64,${cat.icon}`}
                    alt={cat.name}
                  />
                </div>
                <div className="text-base font-medium text-gray-700 text-center">
                  {cat.name}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default CategoriesCarousel;
