// import { useState, useRef } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { userLogout } from '../redux/slices/userSlice';
// import { FaUserCircle } from 'react-icons/fa';

// const HeaderUser = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const menuTimer = useRef(null);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { userInfo } = useSelector((state) => state.user);

//   const navLinks = [
//     { to: '/', label: 'Trang chủ' },
//     { to: '/products', label: 'Sản phẩm' },
//     { to: '/cart', label: 'Giỏ hàng' },
//   ];

//   const handleLogout = () => {
//     dispatch(userLogout());
//     setIsMenuOpen(false);
//     navigate('/');
//   };

//   const handleMouseEnter = () => {
//     clearTimeout(menuTimer.current);
//     setIsMenuOpen(true);
//   };

//   const handleMouseLeave = () => {
//     menuTimer.current = setTimeout(() => {
//       setIsMenuOpen(false);
//     }, 300); // Delay để user kịp rê chuột vào dropdown
//   };

//   return (
//     <header className="bg-cyan-900 text-white shadow-md">
//       <div className="container mx-auto px-4 py-4 flex justify-between items-center">
//         <Link to="/" className="text-xl font-bold">
//           AShop
//         </Link>

//         {/* Desktop Navigation */}
//         <nav className="hidden md:flex gap-6 items-center">
//           {navLinks.map(({ to, label }) => (
//             <Link key={to} to={to} className="hover:text-blue-300">
//               {label}
//             </Link>
//           ))}

//           {userInfo ? (
//             <div
//               className="relative"
//               onMouseEnter={handleMouseEnter}
//               onMouseLeave={handleMouseLeave}
//             >
//               <div className="flex items-center gap-1 cursor-pointer">
//                 <FaUserCircle className="text-xl" />
//                 <span className="text-sm">{userInfo.name}</span>
//               </div>

//               {isMenuOpen && (
//                 <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-md z-50 transition-opacity duration-200">
//                   <button
//                     className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//                     onClick={handleLogout}
//                   >
//                     Đăng xuất
//                   </button>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <Link to="/login" className=" hover:text-blue-300">
//               Đăng nhập
//             </Link>
//           )}
//         </nav>

//         <button
//           className="md:hidden text-white"
//           onClick={() => setIsMenuOpen(!isMenuOpen)}
//         >
//           {isMenuOpen ? (
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
//                 d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           ) : (
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
//                 d="M4 6h16M4 12h16M4 18h16" />
//             </svg>
//           )}
//         </button>
//       </div>

//       {isMenuOpen && (
//         <nav className="md:hidden bg-gray-800 text-white">
//           <ul className="flex flex-col px-4 py-2 space-y-2">
//             {navLinks.map(({ to, label }) => (
//               <li key={to}>
//                 <Link
//                   to={to}
//                   className="block py-2 hover:text-blue-300"
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   {label}
//                 </Link>
//               </li>
//             ))}
//             {userInfo ? (
//               <li>
//                 <button
//                   className="block w-full text-left py-2 hover:text-blue-300"
//                   onClick={handleLogout}
//                 >
//                   Đăng xuất
//                 </button>
//               </li>
//             ) : (
//               <li>
//                 <Link
//                   to="/login"
//                   className="block py-2 hover:text-blue-300"
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   Đăng nhập
//                 </Link>
//               </li>
//             )}
//           </ul>
//         </nav>
//       )}
//     </header>
//   );
// };

import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userLogout } from "../redux/slices/userSlice";
import CartSidebar from "./CartSidebar";
import { FaUserCircle, FaShoppingCart } from "react-icons/fa";

const HeaderUser = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCartOpen, setCartOpen] = useState(false);
  const dropdownTimer = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.user);
  const cartItems = useSelector((state) => state.cart.items);

  // Tổng số lượng sản phẩm trong giỏ
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks = [
    { to: "/", label: "Trang chủ" },
    { to: "/blogs", label: "Tin tức" },
    { to: "/products", label: "Sản phẩm" },
  ];

  const handleLogout = () => {
    dispatch(userLogout());
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
    navigate("/login");
  };

  const handleDropdownEnter = () => {
    clearTimeout(dropdownTimer.current);
    setIsDropdownOpen(true);
  };
  const handleDropdownLeave = () => {
    dropdownTimer.current = setTimeout(() => setIsDropdownOpen(false), 300);
  };

  return (
    <>
      <header className="bg-cyan-900 text-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center text-xl font-bold">
            <img
              src="/assets/images/logo.png"
              alt="AShop Logo"
              className="w-8 h-8 object-contain mr-2"
            />
            AShop
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-6 items-center">
            {navLinks.map(({ to, label }) => (
              <Link key={to} to={to} className="hover:text-blue-300">
                {label}
              </Link>
            ))}

            {/* Icon Giỏ hàng */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative focus:outline-none"
            >
              <FaShoppingCart className="text-xl" />
              {totalQuantity > 0 && (
                <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full px-1">
                  {totalQuantity}
                </span>
              )}
            </button>

            {/* User Dropdown */}
            {userInfo ? (
              <div
                className="relative"
                onMouseEnter={handleDropdownEnter}
                onMouseLeave={handleDropdownLeave}
              >
                <div className="flex items-center gap-1 cursor-pointer">
                  <FaUserCircle className="text-xl" />
                  <span className="text-sm">{userInfo.name}</span>
                </div>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-md z-50">
                    {/* Link đến trang thông tin cá nhân */}
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Thông tin cá nhân
                    </Link>

                    {/* Link đến lịch sử đơn hàng */}
                    <Link
                      to="/order-history"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Lịch sử đơn hàng
                    </Link>

                    {userInfo.isAdmin && (
                      <Link
                        to="/admin/dashboard"
                        className="block px-4 py-2 hover:bg-gray-100"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Trang quản trị
                      </Link>
                    )}

                    <button
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      onClick={handleLogout}
                    >
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="hover:text-blue-300">
                Đăng nhập
              </Link>
            )}
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="md:hidden bg-gray-800 text-white">
            <ul className="flex flex-col px-4 py-2 space-y-2">
              {navLinks.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="block py-2 hover:text-blue-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {label}
                  </Link>
                </li>
              ))}
              {userInfo?.isAdmin && (
                <li>
                  <Link
                    to="/admin/dashboard"
                    className="block py-2 hover:text-blue-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Trang quản trị
                  </Link>
                </li>
              )}
              {userInfo && (
                <>
                  <li>
                    <Link
                      to="/profile"
                      className="block py-2 hover:text-blue-300"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Thông tin cá nhân
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/order-history"
                      className="block py-2 hover:text-blue-300"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Lịch sử đơn hàng
                    </Link>
                  </li>
                </>
              )}
              {userInfo ? (
                <li>
                  <button
                    className="block w-full text-left py-2 hover:text-blue-300"
                    onClick={handleLogout}
                  >
                    Đăng xuất
                  </button>
                </li>
              ) : (
                <li>
                  <Link
                    to="/login"
                    className="block py-2 hover:text-blue-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Đăng nhập
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        )}
      </header>

      {/* Cart Sidebar và overlay */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
};

export default HeaderUser;
