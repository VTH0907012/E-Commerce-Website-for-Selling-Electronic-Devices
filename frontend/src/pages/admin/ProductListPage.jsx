import React, { useEffect, useState } from "react";
import ProductModal from "../../components/ProductModal";
import { getAllProducts, deleteProduct } from "../../service/productApi";

const ITEMS_PER_PAGE = 8;

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchProducts = async () => {
    const res = await getAllProducts();
    setProducts(res);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xoá sản phẩm này không?")) {
      await deleteProduct(id);
      fetchProducts();
    }
  };

  const paginatedProducts = products.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  useEffect(() => {
    fetchProducts();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Quản lý sản phẩm
        </h1>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded shadow"
          onClick={() => {
            setSelected(null);
            setOpenModal(true);
          }}
        >
          + Thêm sản phẩm
        </button>
      </div>
      <hr className="mb-3"/>

      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-blue-50 text-gray-700 font-medium">
            <tr>
              <th className="px-4 py-3">Hình ảnh</th>
              <th className="px-4 py-3">Tên</th>
              <th className="px-4 py-3">Giá</th>
              <th className="px-4 py-3">Số lượng</th>
              <th className="px-4 py-3">Danh mục</th>
              <th className="px-4 py-3">Nhãn hiệu</th>
              <th className="px-4 py-3 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {paginatedProducts.map((p) => (
              <tr
                key={p._id}
                className="border-b hover:bg-gray-50 transition duration-150"
              >
                <td className="px-4 py-2">
                  <img
                    src={`data:image/png;base64,${p.image}`}
                    alt={p.name}
                    className="w-12 h-12 object-contain rounded border"
                  />
                </td>
                <td className="px-4 py-2">{p.name}</td>
                <td className="px-4 py-2 text-red-600 font-semibold">
                  {p.price.toLocaleString()}₫
                </td>
                <td className="px-4 py-2">{p.quantity}</td>
                <td className="px-4 py-2">{p.category?.name}</td>
                <td className="px-4 py-2">{p.brand?.name}</td>
                <td className="px-4 py-2 text-center space-x-2">
                  <button
                    onClick={() => {
                      setSelected(p);
                      setOpenModal(true);
                    }}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded shadow"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded shadow"
                  >
                    Xoá
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Phân trang nếu > 8 sản phẩm */}
      {totalPages > 1 && (
        <div className="mt-4 flex justify-center items-center space-x-2">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {openModal && (
        <ProductModal
          data={selected}
          onClose={() => {
            setOpenModal(false);
            fetchProducts();
          }}
        />
      )}
    </div>
  );
};

export default ProductListPage;
