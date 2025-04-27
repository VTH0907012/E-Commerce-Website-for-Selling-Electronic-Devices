import React, { useEffect, useState } from "react";
import {
  getBrands,
  deleteBrand,
  updateBrand,
  createBrand,
} from "../../service/brandApi";
import { toast, ToastContainer } from "react-toastify";
import BrandModal from "../../components/BrandModal";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal"; // Import modal xác nhận xoá

const ITEMS_PER_PAGE = 8;

const BrandListPage = () => {
  const [brands, setBrands] = useState([]);
  const [selected, setSelected] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false); // State để điều khiển modal xác nhận
  const [brandToDelete, setBrandToDelete] = useState(null); // Lưu trữ thương hiệu cần xoá

  const fetchBrands = async () => {
    try {
      const data = await getBrands();
      setBrands(data);
    } catch (error) {
      console.log(error);
      toast.error("Lỗi khi lấy danh sách thương hiệu");
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  const handleDelete = (id) => {
    setBrandToDelete(id); // Lưu trữ thương hiệu cần xoá
    setIsConfirmationOpen(true); // Mở modal xác nhận
  };

  const confirmDelete = async () => {
    try {
      if (brandToDelete) {
        await deleteBrand(brandToDelete);
        toast.success("Xoá thương hiệu thành công");
        fetchBrands();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Xoá thất bại");
    } finally {
      setIsConfirmationOpen(false); // Đóng modal xác nhận
      setBrandToDelete(null); // Reset thương hiệu cần xoá
    }
  };

  const handleEdit = (brand) => {
    setSelected(brand);
    setOpenModal(true);
  };

  const handleAdd = () => {
    setSelected(null);
    setOpenModal(true);
  };

  const handleSave = async (data) => {
    try {
      if (data._id) {
        await updateBrand(data._id, data);
        toast.success("Cập nhật thương hiệu thành công");
      } else {
        await createBrand(data);
        toast.success("Thêm thương hiệu thành công");
      }
      fetchBrands();
      setOpenModal(false);
    } catch (error) {
      console.log(error);
      toast.error("Lưu thương hiệu thất bại");
    }
  };

  const paginatedBrands = brands.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  const totalPages = Math.ceil(brands.length / ITEMS_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Quản lý nhãn hiệu</h1>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded shadow"
          onClick={handleAdd}
        >
          + Thêm nhãn hiệu
        </button>
      </div>
      <hr className="mb-3" />

      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-blue-50 text-gray-700 font-medium">
            <tr>
              <th className="px-4 py-3">Tên thương hiệu</th>
              <th className="px-4 py-3">Mô tả</th>
              <th className="px-4 py-3 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {paginatedBrands.map((b) => (
              <tr
                key={b._id}
                className="border-b hover:bg-gray-50 transition duration-150"
              >
                <td className="px-4 py-2">{b.name}</td>
                <td className="px-4 py-2">{b.description}</td>
                <td className="px-4 py-2 text-center space-x-2">
                  <button
                    onClick={() => handleEdit(b)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded shadow"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(b._id)}
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
        <BrandModal
          isOpen={openModal}
          closeModal={() => setOpenModal(false)}
          brand={selected}
          onSave={handleSave}
        />
      )}

      {/* Modal xác nhận xoá */}
      {isConfirmationOpen && (
        <ConfirmDeleteModal
          isOpen={isConfirmationOpen}
          onConfirm={confirmDelete}
          onClose={() => setIsConfirmationOpen(false)}
          content="Bạn có chắc chắn muốn xoá nhãn hiệu này không?"


        />
      )}

      {/* <ToastContainer position="top-right" autoClose={2000} /> */}
    </div>
  );
};

export default BrandListPage;
