const FooterUser = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Về chúng tôi</h3>
            <p className="text-gray-400">
              Công ty chúng tôi chuyên cung cấp các sản phẩm và dịch vụ tốt
              nhất.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Liên kết</h3>
            <ul>
              <li> Trang chủ </li>
              <li> Giới thiệu </li>
              <li> Dịch vụ </li>
              <li> Liên hệ </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Liên hệ</h3>
            <ul>
              <li className="text-gray-400">Địa chỉ: 123 Đường ABC, Quận XYZ</li>
              <li className="text-gray-400">Email: info@company.com</li>
              <li className="text-gray-400">SĐT: (123) 456-7890</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Mạng xã hội</h3>
            <ul className="flex space-x-4">
              <li>
                <a href="#" className="flex items-center space-x-2">
                  <i className="fab fa-facebook-f"></i>
                  <span>Facebook</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center space-x-2">
                  <i className="fab fa-twitter"></i>
                  <span>Twitter</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center space-x-2">
                  <i className="fab fa-instagram"></i>
                  <span>Instagram</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-600 pt-4 text-center text-gray-400">
          <p>&copy; 2025 Công ty ABC. Tất cả các quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  );
};

export default FooterUser;
