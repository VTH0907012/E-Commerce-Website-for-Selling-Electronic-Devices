import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";
import { addToCart } from "../../redux/slices/cartSlice";
import { getProductById, getAllProducts } from "../../service/productApi";
import CartSidebar from "../../components/CartSidebar";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      // 1. Lấy chi tiết
      const p = await getProductById(id);
      setProduct(p);

      // 2. Lấy tất cả rồi lọc cùng danh mục, trừ chính nó, giới hạn 4
      const all = await getAllProducts();
      const rel = all
        .filter(
          (item) => item.category?._id === p.category?._id && item._id !== p._id
        )
        .slice(0, 4);
      setRelated(rel);

      setLoading(false);
    };

    fetchData();
  }, [id]);

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    setCartOpen(true);
  };

  if (loading) return <div className="text-center py-10">Đang tải…</div>;
  if (!product)
    return <div className="text-center py-10">Không tìm thấy sản phẩm.</div>;

  return (
    <>
      <div className="max-w-6xl mx-auto p-4">
        {/* Chi tiết SP */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  <img
    src={`data:image/png;base64,${product.image}`}
    alt={product.name}
    className="w-full h-96 object-cover rounded-lg shadow-lg"
  />
  <div className="flex flex-col justify-center space-y-4">
    <h2 className="text-2xl font-bold">Sản phẩm: {product.name}</h2>
    <p className="text-gray-600">Mô tả: {product.description}</p>
    <p className="text-blue-600 text-xl font-semibold">
      Giá tiền: {product.price.toLocaleString()}đ
    </p>
    <button
      onClick={() => handleAddToCart(product)}
      className="
        inline-flex 
        items-center 
        gap-2 
        bg-gradient-to-r from-blue-500 to-blue-600 
        hover:from-blue-600 hover:to-blue-700 
        text-white 
        font-semibold 
        px-4 py-2 
        rounded-lg 
        shadow-lg 
        transition-transform transform 
        hover:scale-105
        w-fit
      "
    >
      <FaShoppingCart className="text-base" />
      Thêm vào giỏ
    </button>
  </div>
</div>


{/* Sản phẩm liên quan */}
{related.length > 0 && (
  <div className="mt-10">
    <hr className="mb-6" />
    <h3 className="text-xl font-bold mb-4">Sản phẩm liên quan</h3>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
      {related.map((item) => (
        <div
          key={item._id}
          className="bg-white p-4 rounded-lg shadow-lg flex flex-col items-center space-y-4 transition-transform transform hover:scale-105 hover:shadow-2xl hover:shadow-indigo-500/50"
        >
          <Link to={`/product/${item._id}`} className="w-full flex flex-col items-center">
            <img
              src={`data:image/png;base64,${item.image}`}
              alt={item.name}
              className="w-full h-56 object-cover rounded-lg mb-4 transition-transform transform hover:scale-110"
            />
            <h4 className="text-sm font-semibold text-center text-gray-800 truncate">{item.name}</h4>
            <p className="text-blue-600 font-semibold text-center mt-1">
              Giá tiền: {item.price.toLocaleString()}đ
            </p>
          </Link>
          
          <button
            onClick={() => handleAddToCart(item)}
            className="mt-4 inline-flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white text-sm rounded-full shadow-md hover:bg-green-700 transition-colors transform hover:scale-105"
          >
            <FaShoppingCart className="text-sm" />
            Thêm vào giỏ
          </button>
        </div>
      ))}
    </div>
  </div>
)}

      </div>

      {/* Sidebar giỏ hàng */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
};

export default ProductDetail;
