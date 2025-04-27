import React, { useEffect, useState } from "react";
import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../service/categoryApi";
import { toast } from "react-toastify";
import CategoryModal from "../../components/CategoryModal";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal"; // Import ConfirmDeleteModal

const ITEMS_PER_PAGE = 8;

const CategoryListPage = () => {
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // State for delete confirmation modal
  const [categoryToDelete, setCategoryToDelete] = useState(null); // Store category to delete

  const fetchCategories = async () => {
    try {
      const res = await getAllCategories();
      setCategories(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Lỗi khi lấy danh sách danh mục");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDeleteConfirmation = async () => {
    if (categoryToDelete) {
      try {
        await deleteCategory(categoryToDelete._id);
        toast.success("Xoá danh mục thành công");
        fetchCategories();
        setShowDeleteModal(false); // Close the modal after deletion
      } catch (error) {
        console.log(error);
        toast.error("Xoá danh mục thất bại");
      }
    }
  };

  const handleSave = async (data) => {
    try {
      if (data._id) {
        await updateCategory(data._id, data);
        toast.success("Cập nhật danh mục thành công");
      } else {
        await createCategory(data);
        toast.success("Thêm danh mục thành công");
      }
      fetchCategories();
      setOpenModal(false);
    } catch (error) {
      console.log(error);
      toast.error("Lưu danh mục thất bại");
    }
  };

  const paginatedCategories = categories.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(categories.length / ITEMS_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Quản lý danh mục</h1>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded shadow"
          onClick={() => {
            setSelected(null);
            setOpenModal(true);
          }}
        >
          + Thêm danh mục
        </button>
      </div>
      <hr className="mb-3" />
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-blue-50 text-gray-700 font-medium">
            <tr>
              <th className="px-4 py-3">Hình ảnh</th>
              <th className="px-4 py-3">Tên danh mục</th>
              <th className="px-4 py-3 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {paginatedCategories.map((cat) => (
              <tr
                key={cat._id}
                className="border-b hover:bg-gray-50 transition duration-150"
              >
                <td className="px-4 py-2">
                  <img
                    src={`data:image/png;base64,${cat.icon}`}
                    alt={cat.name}
                    className="w-12 h-12 object-contain rounded border"
                  />
                </td>
                <td className="px-4 py-2">{cat.name}</td>
                <td className="px-4 py-2 text-center space-x-2">
                  <button
                    onClick={() => {
                      setSelected(cat);
                      setOpenModal(true);
                    }}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded shadow"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => {
                      setCategoryToDelete(cat); // Set the category to delete
                      setShowDeleteModal(true); // Show the delete confirmation modal
                    }}
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

      {/* Pagination */}
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

      {/* Category Modal */}
      {openModal && (
        <CategoryModal
          isOpen={openModal}
          closeModal={() => setOpenModal(false)}
          category={selected}
          onSave={handleSave}
        />
      )}

      {/* Confirm Delete Modal */}
      {showDeleteModal && (
        <ConfirmDeleteModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDeleteConfirmation}
          content="Bạn có chắc chắn muốn xoá danh mục này không?"
        />
      )}
    </div>
  );
};

export default CategoryListPage;
