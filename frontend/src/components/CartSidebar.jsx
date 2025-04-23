import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom"; // ← thêm dòng này

const CartSidebar = ({ isOpen, onClose }) => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const { userInfo } = useSelector((state) => state.user); // ← lấy user
  const navigate = useNavigate(); // ← điều hướng

  const handleCheckout = () => {
    if (!userInfo) {
      navigate("/login");
    } else {
      navigate("/checkout");
    }
    onClose(); // đóng sidebar luôn
  };

  return (
    <>
      {/* Overlay khi sidebar mở */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-[rgba(0,0,0,0.3)] z-40"
          onClick={onClose} // Đóng sidebar khi click vào overlay
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transition-transform duration-300 z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">Giỏ hàng</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            &times;
          </button>
        </div>

        <div className="p-4 overflow-y-auto h-[calc(100%-160px)]">
          {cartItems.length === 0 ? (
            <p>Chưa có sản phẩm trong giỏ hàng.</p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between mb-4"
              >
                <img
                  src={`data:image/png;base64,${item.image}`}
                  alt={item.name}
                  className="w-14 h-14 object-cover rounded"
                />

                <div className="flex-1 px-2">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-500">
                    {item.price.toLocaleString()} ₫
                  </p>
                  <div className="flex items-center mt-1">
                    <button
                      onClick={() => dispatch(decreaseQuantity(item._id))}
                      className="px-2"
                    >
                      -
                    </button>
                    <span className="px-2">{item.quantity}</span>
                    <button
                      onClick={() => dispatch(increaseQuantity(item._id))}
                      className="px-2"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => dispatch(removeFromCart(item._id))}
                  className="text-red-500 px-2"
                >
                  &times;
                </button>
              </div>
            ))
          )}
        </div>

        <div className="p-4 border-t">
          <div className="flex justify-between font-semibold mb-2">
            <span>Tổng cộng:</span>
            <span>{total.toLocaleString()} ₫</span>
          </div>
          <button
            onClick={handleCheckout}
            className="w-full bg-black text-white py-2 rounded hover:opacity-90"
          >
            Thanh toán
          </button>
        </div>
      </div>
    </>
  );
};

export default CartSidebar;
