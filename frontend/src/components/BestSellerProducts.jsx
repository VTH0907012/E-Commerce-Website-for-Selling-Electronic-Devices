// export default BestSellerProducts;
import React, { useEffect, useState } from "react";
import { getAllProducts } from "../service/productApi"; // Đường dẫn điều chỉnh theo đúng cấu trúc của bạn
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

//Giỏ hàng
import CartSidebar from "./CartSidebar";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice"; // chỉnh path theo dự án bạn

const BestSellerProducts = () => {
  const [products, setProducts] = useState([]);
  //Giỏ hàng
  const [isCartOpen, setCartOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getAllProducts();
        setProducts(res.slice(0, 4)); // Lấy 4 sản phẩm đầu tiên
      } catch (error) {
        console.error("Lỗi khi lấy danh sách sản phẩm:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="py-10 px-4 bg-white">
      <h2 className="text-3xl font-bold mb-6 text-blue-900 text-center">
        Gợi ý sản phẩm
      </h2>

      {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 p-4 flex flex-col items-center text-center"
          >
            <Link
              to={`/product/${product._id}`}
              className="w-full flex flex-col items-center"
            >
              <img
                src={`data:image/png;base64,${product.image}`}
                alt={product.name}
                className="w-full h-55 object-cover rounded-lg mb-4 transform hover:scale-105 transition"
              />
              <hr className="w-full border-t border-gray-400 my-2" />

              <h3 className="text-lg font-semibold text-gray-800">
                {product.name}
              </h3>
              <p className="text-red-500 text-base font-medium mt-1">
                {product.price.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </p>
            </Link>
            {/* <button className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">
              Mua ngay
            </button> */}
            <button
              onClick={() => {
                dispatch(addToCart(product)); // ✅ thêm vào giỏ
                setCartOpen(true); // ✅ mở giỏ hàng
              }}
              className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition flex items-center gap-2"
            >
              <FaShoppingCart className="text-white" />
              Mua ngay
            </button>
          </div>
        ))}
        <CartSidebar isOpen={isCartOpen} onClose={() => setCartOpen(false)} />
      </div>
    </div>
  );
};

export default BestSellerProducts;
