// import React, { useEffect, useState } from "react";
// import api from "../../utils/api";
// import { toast, ToastContainer } from "react-toastify";
// import CategoryModal from "../../components/CategoryModal";

// const CategoryListPage = () => {
//   const [categories, setCategories] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState(null);

//   const fetchCategories = async () => {
//     try {
//       const res = await api.get("/api/categories");
//       setCategories(res.data);
//     } catch (error) {
//       console.error("Lỗi khi lấy danh mục:", error);
//       toast.error("Lỗi khi lấy danh sách danh mục");
//     }
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const handleDelete = async (id) => {
//     if (window.confirm("Bạn có chắc muốn xoá danh mục này?")) {
//       try {
//         await api.delete(`/api/categories/${id}`);
//         toast.success("Xoá danh mục thành công");
//         fetchCategories();
//       } catch (error) {
//         toast.error(error?.response?.data?.message || "Xoá thất bại");
//       }
//     }
//   };

//   const handleEdit = (category) => {
//     setSelectedCategory(category);
//     setShowModal(true);
//   };

//   const handleAdd = () => {
//     setSelectedCategory(null);
//     setShowModal(true);
//   };

//   const handleSave = async (data) => {
//     try {
//       if (data._id) {
//         await api.put(`/api/categories/${data._id}`, data);
//         toast.success("Cập nhật danh mục thành công");
//       } else {
//         await api.post("/api/categories", data);
//         toast.success("Thêm danh mục thành công");
//       }

//       fetchCategories();
//       setShowModal(false);
//     } catch (error) {
//       console.error("Lỗi khi lưu danh mục:", error);
//       toast.error("Lưu danh mục thất bại");
//     }
//   };

//   return (
//     <div className="p-4  mx-auto">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">Quản lý Danh mục</h1>
//         <button
//           onClick={handleAdd}
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           + Thêm danh mục
//         </button>
//       </div>
//       <hr className="border-t border-gray-600 opacity-50 mb-4" />
//       <table className="w-full border border-gray-200 shadow-sm rounded bg-white-50">
//         <thead className="bg-gray-300">
//           <tr>
//             <th className="text-left px-4 py-2 border-b">Hình</th>
//             <th className="text-left px-4 py-2 border-b">Tên danh mục</th>
//             <th className="text-center px-4 py-2 border-b w-40">Hành động</th>
//           </tr>
//         </thead>
//         <tbody>
//           {categories.map((cat) => (
//             <tr key={cat._id} className="hover:bg-gray-50">
//               <td className="px-4 py-2 border-b">
//                 <img
//                   src={`data:image/png;base64,${cat.icon}`}
//                   alt={cat.name}
//                   className="w-10 h-10 object-contain"
//                 />
//               </td>
//               <td className="px-4 py-2 border-b">{cat.name}</td>
//               <td className="px-4 py-2 border-b text-center space-x-2">
//                 <button
//                   onClick={() => handleEdit(cat)}
//                   className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
//                 >
//                   Sửa
//                 </button>
//                 <button
//                   onClick={() => handleDelete(cat._id)}
//                   className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
//                 >
//                   Xoá
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <CategoryModal
//         isOpen={showModal}
//         closeModal={() => setShowModal(false)}
//         category={selectedCategory}
//         onSave={handleSave}
//       />

//       <ToastContainer position="top-right" autoClose={2000} />
//     </div>
//   );
// };
import React, { useEffect, useState } from "react";
import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../service/categoryApi";
import { toast } from "react-toastify";
import CategoryModal from "../../components/CategoryModal";

const ITEMS_PER_PAGE = 8;

const CategoryListPage = () => {
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

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

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xoá danh mục này không?")) {
      try {
        await deleteCategory(id);
        toast.success("Xoá danh mục thành công");
        fetchCategories();
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
          <hr className="mb-3"/>
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
                    onClick={() => handleDelete(cat._id)}
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

      {openModal && (
        <CategoryModal
          isOpen={openModal}
          closeModal={() => setOpenModal(false)}
          category={selected}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default CategoryListPage;
