// // export default ProductList;
// import React, { useEffect, useState } from "react";
// import { getAllProducts } from "../../service/productApi";
// import { getAllCategories } from "../../service/categoryApi";

// const priceFilters = [
//   { label: "Dưới 5 triệu", value: "under5" },
//   { label: "5 - 10 triệu", value: "5to10" },
//   { label: "10 - 20 triệu", value: "10to20" },
//   { label: "Trên 20 triệu", value: "above20" },
// ];

// const ProductList = () => {
//   const [products, setProducts] = useState([]);
//   const [categories, setCategories] = useState(["Tất cả"]);
//   const [selectedCategory, setSelectedCategory] = useState("Tất cả");
//   const [selectedPrice, setSelectedPrice] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [productsRes, categoriesRes] = await Promise.all([
//           getAllProducts(),
//           getAllCategories(),
//         ]);

//         setProducts(productsRes); // Nếu productsRes đã là mảng
//         setCategories(["Tất cả", ...categoriesRes.data.map((c) => c.name)]);
//       } catch (error) {
//         console.error("Lỗi khi tải dữ liệu:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const filterByPrice = (product) => {
//     const price = product.price;
//     switch (selectedPrice) {
//       case "under5":
//         return price < 5000000;
//       case "5to10":
//         return price >= 5000000 && price <= 10000000;
//       case "10to20":
//         return price > 10000000 && price <= 20000000;
//       case "above20":
//         return price > 20000000;
//       default:
//         return true;
//     }
//   };

//   const filterByCategory = (product) => {
//     if (selectedCategory === "Tất cả") return true;
//     return product.category === selectedCategory;
//   };

//   const filteredProducts = products
//     .filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
//     .filter(filterByCategory)
//     .filter(filterByPrice);

//   return (
//     <div className="flex flex-col md:flex-row gap-6 p-6 bg-gray-100 min-h-screen">
//       {/* Sidebar */}
//       <aside className="w-full md:w-1/4 bg-white p-4 rounded shadow">
//         <h3 className="text-lg font-semibold mb-3">Danh mục</h3>
//         <ul className="space-y-2 mb-6">
//           {categories.map((cat) => (
//             <li key={cat}>
//               <button
//                 className={`w-full text-left px-2 py-1 rounded ${
//                   selectedCategory === cat
//                     ? "bg-blue-600 text-white"
//                     : "hover:bg-blue-100"
//                 }`}
//                 onClick={() => setSelectedCategory(cat)}
//               >
//                 {cat}
//               </button>
//             </li>
//           ))}
//         </ul>

//         <h3 className="text-lg font-semibold mb-2">Lọc theo giá</h3>
//         <ul className="space-y-2">
//           {priceFilters.map((filter) => (
//             <li key={filter.value}>
//               <label className="flex items-center space-x-2 cursor-pointer">
//                 <input
//                   type="radio"
//                   name="price"
//                   value={filter.value}
//                   checked={selectedPrice === filter.value}
//                   onChange={() => setSelectedPrice(filter.value)}
//                   className="accent-blue-600"
//                 />
//                 <span>{filter.label}</span>
//               </label>
//             </li>
//           ))}
//         </ul>
//         <button
//           className="mt-4 text-sm text-blue-600 underline"
//           onClick={() => setSelectedPrice("")}
//         >
//           Xoá lọc
//         </button>
//       </aside>

//       {/* Main content */}
//       <div className="flex-1">
//         <div className="mb-6 flex justify-between items-center">
//           <h2 className="text-2xl font-bold text-blue-900">Tất cả sản phẩm</h2>
//           <input
//             type="text"
//             placeholder="Tìm kiếm sản phẩm..."
//             className="border px-4 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>

//         {loading ? (
//           <div className="text-center py-20 text-gray-500">
//             Đang tải sản phẩm...
//           </div>
//         ) : filteredProducts.length > 0 ? (
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {filteredProducts.map((product) => (
//               <div
//                 key={product._id}
//                 className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
//               >
//                 <img
//                   src={`data:image/png;base64,${product.image}`}
//                   alt={product.name}
//                   className="mb-3 w-full h-48 object-cover rounded"
//                 />
//                 <h3 className="text-lg font-semibold">{product.name}</h3>
//                 <p className="text-blue-600 font-medium">
//                   {product.price.toLocaleString()}đ
//                 </p>
//                 <button className="mt-2 w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
//                   Mua ngay
//                 </button>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-20 bg-white rounded-lg shadow text-gray-500">
//             <p className="text-xl font-medium">
//               Không tìm thấy sản phẩm nào phù hợp.
//             </p>
//             <p className="mt-2">Hãy thử thay đổi từ khoá hoặc bộ lọc.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };
// export default ProductList;

import React, { useEffect, useState } from "react";
import { getAllProducts } from "../../service/productApi";
import { getAllCategories } from "../../service/categoryApi";
import { getBrands } from "../../service/brandApi";
import { FaShoppingCart } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";

//Giỏ hàng
import CartSidebar from "../../components/CartSidebar";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice"; // chỉnh path theo dự án bạn

import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const ProductList = () => {

  const navigate = useNavigate();

  //Giỏ hàng
  const [isCartOpen, setCartOpen] = useState(false);
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(["Tất cả"]);
  const [brands, setBrands] = useState(["Tất cả"]);
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [selectedBrand, setSelectedBrand] = useState("Tất cả");
  const [maxPrice, setMaxPrice] = useState(50000000);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes, brandsRes] = await Promise.all([
          getAllProducts(),
          getAllCategories(),
          getBrands(),
        ]);

        setProducts(productsRes);
        setCategories(["Tất cả", ...categoriesRes.data.map((c) => c.name)]);
        setBrands(["Tất cả", ...brandsRes.map((b) => b.name)]);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const location = useLocation();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryFromUrl = params.get("category");
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [location.search]);

  // Reset trang về 1 khi lọc
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, selectedBrand, maxPrice]);

  const filterByCategory = (product) => {
    if (selectedCategory === "Tất cả") return true;
    return product.category?.name === selectedCategory;
  };

  const filterByBrand = (product) => {
    if (selectedBrand === "Tất cả") return true;
    return product.brand?.name === selectedBrand;
  };

  const filterByPrice = (product) => {
    return product.price <= maxPrice;
  };

  const isFiltering =
    searchTerm !== "" ||
    selectedCategory !== "Tất cả" ||
    selectedBrand !== "Tất cả" ||
    maxPrice < 50000000;

  const displayedProducts = isFiltering
    ? products
        .filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .filter(filterByCategory)
        .filter(filterByBrand)
        .filter(filterByPrice)
    : products;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = displayedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(displayedProducts.length / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 bg-gray-100 min-h-screen">
      {/* Sidebar */}
      {/* <aside className="w-full md:w-1/5 space-y-3 max-h-[85vh]"> */}
      <aside className="w-full md:w-[280px] lg:w-[240px] space-y-3 max-h-[85vh]">
        <div className="text-xs space-y-1">
          <button
            className="flex items-center space-x-1 text-blue-600 border border-blue-600 rounded-full hover:bg-blue-600 hover:text-white px-2 py-1"
            onClick={() => setMaxPrice(50000000)}
          >
            <span className="text-lg">&times;</span>
            <span className="text-xs">Xoá lọc giá</span>
          </button>
          <button
            className="flex items-center space-x-1 text-green-600 border border-green-600 rounded-full hover:bg-green-600 hover:text-white px-2 py-1"
            onClick={() => setSelectedBrand("Tất cả")}
          >
            <span className="text-lg">&times;</span>
            <span className="text-xs">Xoá lọc thương hiệu</span>
          </button>
        </div>
        <div className="bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200 p-3 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300">
          <h3 className="text-xl font-semibold text-blue-800 bg-blue-200  rounded-md  text-center shadow-sm">
            Danh mục
          </h3>
          <hr className="border-blue-300 mb-3" />
          <ul className="space-y-2 max-h-40 overflow-y-auto pr-1">
            {categories.map((cat) => (
              <li key={cat} className="group hover:bg-blue-50 rounded-md">
                <label className="flex items-center space-x-2 cursor-pointer transition-colors duration-200 group-hover:text-blue-600">
                  <input
                    type="radio"
                    name="category"
                    value={cat}
                    checked={selectedCategory === cat}
                    onChange={() => setSelectedCategory(cat)}
                    className="accent-blue-600"
                  />
                  <span>{cat}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-gradient-to-r from-green-50 via-green-100 to-green-200 p-3 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300">
          <h3 className="text-xl font-semibold text-green-800 bg-green-200  rounded-md  text-center shadow-sm">
            Thương hiệu
          </h3>
          <hr className="border-green-300 mb-3" />
          <ul className="space-y-2 max-h-40 overflow-y-auto pr-1">
            {brands.map((brand) => (
              <li key={brand} className="group hover:bg-green-50 rounded-md">
                <label className="flex items-center space-x-2 cursor-pointer transition-colors duration-200 group-hover:text-green-600">
                  <input
                    type="radio"
                    name="brand"
                    value={brand}
                    checked={selectedBrand === brand}
                    onChange={() => setSelectedBrand(brand)}
                    className="accent-green-600"
                  />
                  <span>{brand}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
        {/* md:block ẩn khi hiện giao diện điện thoại */}
        <div className="bg-white p-3 rounded shadow-sm hidden md:block">
          <h3 className="text-base font-semibold mb-2">Lọc theo giá</h3>
          <hr className="mb-2" />
          <div className="flex flex-col space-y-2">
            <span className="text-sm text-gray-700">
              Tối đa:{" "}
              <strong className="text-blue-600">
                {maxPrice.toLocaleString()}đ
              </strong>
            </span>
            <input
              type="range"
              min={0}
              max={50000000}
              step={1000000}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-blue-600"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>0đ</span>
              <span>50 triệu</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1">
        <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div className="flex items-center gap-3 ">
            <div className="text-3xl animate-bounce">🛍️</div>
            <h2 className="text-3xl font-extrabold bg-gradient-to-r from-pink-500 via-blue-500 to-purple-500 bg-clip-text text-transparent drop-shadow-md ">
              Tất cả sản phẩm
            </h2>
          </div>
          <div className="relative w-full md:w-80 ">
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <AiOutlineSearch className="absolute left-3 top-3 text-gray-400 text-lg" />
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-500">
            Đang tải sản phẩm...
          </div>
        ) : currentProducts.length > 0 ? (
          <>
            {/* <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"> */}
            <div  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {currentProducts.map((product) => (
                <div   onClick={() => navigate(`/product/${product._id}`)}

                  key={product._id}
                  className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition flex flex-col items-center"
                >
                  <img
                    src={`data:image/png;base64,${product.image}`}
                    alt={product.name}
                    className="mb-3 w-full h-48 object-cover rounded"
                  />
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-blue-600 font-medium">
                    {product.price.toLocaleString()}đ
                  </p>
                  <hr className="w-full border-t border-gray-400 my-2" />
                  {/* <button
                    onClick={() => setCartOpen(true)}
                    className="mt-2 px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full shadow-md hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 ease-in-out flex items-center gap-2">
                    <FaShoppingCart className="text-white" />
                    Mua ngay
                  </button> */}
                  <button
                    onClick={() => {
                      dispatch(addToCart(product)); // ✅ thêm vào giỏ
                      setCartOpen(true); // ✅ mở giỏ hàng
                    }}
                    className="mt-2 px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full shadow-md hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 ease-in-out flex items-center gap-2"
                  >
                    <FaShoppingCart className="text-white" />
                    Mua ngay
                  </button>
                </div>
              ))}
            </div>
            <CartSidebar
              isOpen={isCartOpen}
              onClose={() => setCartOpen(false)}
            />
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-6 flex justify-center items-center space-x-2">
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => handlePageChange(index + 1)}
                    className={`px-3 py-1 rounded border ${
                      currentPage === index + 1
                        ? "bg-blue-600 text-white"
                        : "bg-white text-blue-600 border-blue-600"
                    } hover:bg-blue-700 hover:text-white transition`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-15 bg-white rounded-lg shadow text-gray-500">
            <p className="text-xl font-medium">
              Không tìm thấy sản phẩm nào phù hợp.
            </p>
            <p className="mt-2">Hãy thử thay đổi từ khoá hoặc bộ lọc.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
