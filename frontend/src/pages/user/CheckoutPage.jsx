import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../../redux/slices/cartSlice"; // 👈 chỉnh đường dẫn nếu khác
import { checkoutCart } from "../../service/cartApi"; // 💥 API gọi tách riêng
import { toast } from "react-toastify";

const CheckoutPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
    //const { userInfo } = useSelector((state) => state.user.u); // ← lấy user
  const userId = useSelector((state) => state.user?.userInfo?.id);  

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    phone: "",
    address: "",
    note: "",
    paymentMethod: "cod",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (
      !shippingInfo.fullName ||
      !shippingInfo.phone ||
      !shippingInfo.address
    ) {
      //alert("Vui lòng điền đầy đủ thông tin giao hàng.");
      toast.error("Vui lòng điền đầy đủ thông tin giao hàng.");

      return;
    }

    try {
      const payload = {
        userId,
        shippingInfo,
        items: cartItems.map(item => ({
          product: item._id,
          quantity: item.quantity
        })),
        total,
      };

      await checkoutCart(payload); // 💥 gọi API
      //alert("Đặt hàng thành công!");
      toast.success("Đặt hàng thành công!");
      dispatch(clearCart()); // 💥 Xóa giỏ hàng trong Redux
      navigate("/products"); // 💥 Chuyển về trang sản phẩm
    } catch (error) {
      console.error("Lỗi đặt hàng:", error);
      //alert("Đã xảy ra lỗi khi đặt hàng. Vui lòng thử lại!");
      toast.error("Đã xảy ra lỗi khi đặt hàng. Vui lòng thử lại!");

    }
  };

  if (cartItems.length === 0) {
    return <div className="p-6">Giỏ hàng của bạn đang trống.</div>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* FORM GIAO HÀNG */}
      <div className="md:col-span-2 space-y-4">
        <h1 className="text-2xl font-bold mb-4">Thông tin giao hàng</h1>

        <div className="space-y-3">
          <input
            type="text"
            name="fullName"
            placeholder="Họ và tên"
            className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={shippingInfo.fullName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="phone"
            placeholder="Số điện thoại"
            className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={shippingInfo.phone}
            onChange={handleChange}
          />
          <input
            type="text"
            name="address"
            placeholder="Địa chỉ nhận hàng"
            className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={shippingInfo.address}
            onChange={handleChange}
          />
          <textarea
            name="note"
            placeholder="Ghi chú (nếu có)"
            className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows="3"
            value={shippingInfo.note}
            onChange={handleChange}
          ></textarea>

          <div>
            <label className="font-semibold block mb-2">
              Phương thức thanh toán:
            </label>
            <div className="space-y-2">
              {[
                {
                  id: "cod",
                  label: "Thanh toán khi nhận hàng (COD)",
                  icon: "💵",
                },
                { id: "bank", label: "Chuyển khoản ngân hàng", icon: "🏦" },
                {
                  id: "wallet",
                  label: "Ví điện tử (Momo/ZaloPay)",
                  icon: "📱",
                },
              ].map((method) => (
                <label
                  key={method.id}
                  className={`flex items-center gap-3 border p-3 rounded cursor-pointer transition ${
                    shippingInfo.paymentMethod === method.id
                      ? "border-blue-500 bg-blue-50"
                      : "hover:border-blue-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method.id}
                    checked={shippingInfo.paymentMethod === method.id}
                    onChange={handleChange}
                    className="accent-blue-500"
                  />
                  <span className="text-xl">{method.icon}</span>
                  <span>{method.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* GIỎ HÀNG */}
      <div className="bg-gray-100 p-4 rounded shadow h-fit">
        <h2 className="text-xl font-semibold mb-4">Đơn hàng của bạn</h2>

        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between border-b pb-2"
            >
              <img
                src={`data:image/png;base64,${item.image}`}
                alt={item.name}
                className="w-14 h-14 object-cover rounded"
              />
              <div className="flex-1 px-3">
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-600">x{item.quantity}</p>
              </div>
              <span className="font-semibold">
                {(item.price * item.quantity).toLocaleString()} ₫
              </span>
            </div>
          ))}
        </div>

        <div className="flex justify-between font-semibold text-lg mt-4">
          <span>Tổng cộng:</span>
          <span>{total.toLocaleString()} ₫</span>
        </div>

        <button
          onClick={handleSubmit}
          className="mt-6 w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition"
        >
          Xác nhận thanh toán
        </button>
      </div>
    </div>
    
  );
};

export default CheckoutPage;
