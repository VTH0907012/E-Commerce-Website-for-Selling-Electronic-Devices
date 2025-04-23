// import React, { useEffect, useState } from "react";
// import api from "../../utils/api";
// import { toast, ToastContainer } from "react-toastify";
// import BrandModal from "../../components/BrandModal";

// const BrandListPage = () => {
//   const [brands, setBrands] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedBrand, setSelectedBrand] = useState(null);

//   const fetchBrands = async () => {
//     try {
//       const res = await api.get("/api/brands");
//       setBrands(res.data);
//     } catch (error) {
//       console.error("Lỗi khi lấy thương hiệu:", error);
//       toast.error("Lỗi khi lấy danh sách thương hiệu");
//     }
//   };

//   useEffect(() => {
//     fetchBrands();
//   }, []);

//   const handleDelete = async (id) => {
//     if (window.confirm("Bạn có chắc muốn xoá thương hiệu này?")) {
//       try {
//         await api.delete(`/api/brands/${id}`);
//         toast.success("Xoá thương hiệu thành công");
//         fetchBrands();
//       } catch (error) {
//         toast.error(error?.response?.data?.message || "Xoá thất bại");
//       }
//     }
//   };

//   const handleEdit = (brand) => {
//     setSelectedBrand(brand);
//     setShowModal(true);
//   };

//   const handleAdd = () => {
//     setSelectedBrand(null);
//     setShowModal(true);
//   };

//   const handleSave = async (data) => {
//     try {
//       if (data._id) {
//         await api.put(`/api/brands/${data._id}`, data);
//         toast.success("Cập nhật thương hiệu thành công");
//       } else {
//         await api.post("/api/brands", data);
//         toast.success("Thêm thương hiệu thành công");
//       }

//       fetchBrands();
//       setShowModal(false);
//     } catch (error) {
//       console.error("Lỗi khi lưu thương hiệu:", error);
//       toast.error("Lưu thương hiệu thất bại");
//     }
//   };

//   return (
//     <div className="p-4 mx-auto">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">Quản lý Thương hiệu</h1>
//         <button
//           onClick={handleAdd}
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           + Thêm thương hiệu
//         </button>
//       </div>
//       <hr className="border-t border-gray-600 opacity-50 mb-4" />
//       <table className="w-full border border-gray-200 shadow-sm rounded bg-white-50">
//         <thead className="bg-gray-300">
//           <tr>
//             <th className="text-left px-4 py-2 border-b">Tên thương hiệu</th>
//             <th className="text-left px-4 py-2 border-b">Mô tả thương hiệu</th>

//             <th className="text-center px-4 py-2 border-b w-40">Hành động</th>
//           </tr>
//         </thead>
//         <tbody>
//           {brands.map((brand) => (
//             <tr key={brand._id} className="hover:bg-gray-50">
//               <td className="px-4 py-2 border-b">{brand.name}</td>
//               <td className="px-4 py-2 border-b">{brand.description}</td>

//               <td className="px-4 py-2 border-b text-center space-x-2">
//                 <button
//                   onClick={() => handleEdit(brand)}
//                   className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
//                 >
//                   Sửa
//                 </button>
//                 <button
//                   onClick={() => handleDelete(brand._id)}
//                   className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
//                 >
//                   Xoá
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <BrandModal
//         isOpen={showModal}
//         closeModal={() => setShowModal(false)}
//         brand={selectedBrand}
//         onSave={handleSave}
//       />

//       <ToastContainer position="top-right" autoClose={2000} />
//     </div>
//   );
// };
import React, { useEffect, useState } from "react";
import {
  getBrands,
  deleteBrand,
  updateBrand,
  createBrand,
} from "../../service/brandApi";
import { toast, ToastContainer } from "react-toastify";
import BrandModal from "../../components/BrandModal";

const ITEMS_PER_PAGE = 8;

const BrandListPage = () => {
  const [brands, setBrands] = useState([]);
  const [selected, setSelected] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

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

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xoá thương hiệu này?")) {
      try {
        await deleteBrand(id);
        toast.success("Xoá thương hiệu thành công");
        fetchBrands();
      } catch (error) {
        toast.error(error?.response?.data?.message || "Xoá thất bại");
      }
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
        <h1 className="text-2xl font-semibold text-gray-800">
          Quản lý nhãn hiệu
        </h1>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded shadow"
          onClick={handleAdd}
        >
          + Thêm nhãn hiệu
        </button>
      </div>
      <hr className="mb-3"/>

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

      {/* <ToastContainer position="top-right" autoClose={2000} /> */}
    </div>
  );
};

export default BrandListPage;

