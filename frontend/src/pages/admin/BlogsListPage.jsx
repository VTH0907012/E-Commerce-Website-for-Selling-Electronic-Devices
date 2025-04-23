import React, { useEffect, useState } from "react";
import {
  getAllNews,
  createNews,
  updateNews,
  deleteNews,
  
} from "../../service/blogApi";
import { toast } from "react-toastify";
import NewsModal from "../../components/BlogsModal";

const ITEMS_PER_PAGE = 8;

const BlogsListPage = () => {
  const [newsList, setNewsList] = useState([]);
  const [selected, setSelected] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchNews = async () => {
    try {
      const res = await getAllNews();
  
      // Giả sử response trả về trực tiếp là mảng
      if (Array.isArray(res)) {
        setNewsList(res);
      } 
      // Nếu response dạng { data: [...] }
      else if (res && Array.isArray(res.data)) {
        setNewsList(res.data);
      } 
      // Nếu không hợp lệ, set về mảng rỗng
      else {
        setNewsList([]);
      }
  
    } catch (error) {
      console.log(error);
      toast.error("Lỗi khi lấy danh sách tin tức");
    }
  };
  
  useEffect(() => {
    fetchNews();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xoá tin này không?")) {
      try {
        await deleteNews(id);
        toast.success("Xoá tin tức thành công");
        fetchNews();
      } catch (error) {
        console.log(error);
        toast.error("Xoá tin tức thất bại");
      }
    }
  };

  const handleSave = async (data) => {
    try {
      if (data._id) {
        await updateNews(data._id, data);
        toast.success("Cập nhật tin tức thành công");
      } else {
        await createNews(data);
        toast.success("Thêm tin tức thành công");
      }
      fetchNews();
      setOpenModal(false);
    } catch (error) {
      console.log(error);
      toast.error("Lưu tin tức thất bại");
    }
  };

  const paginatedNews = newsList.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(newsList.length / ITEMS_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Quản lý Tin tức</h1>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded shadow"
          onClick={() => {
            setSelected(null);
            setOpenModal(true);
          }}
        >
          + Thêm tin tức
        </button>
      </div>

      <hr className="mb-3" />

      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-blue-50 text-gray-700 font-medium">
            <tr>
              <th className="px-4 py-3">Hình ảnh</th>
              <th className="px-4 py-3">Tiêu đề</th>
              <th className="px-4 py-3 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {paginatedNews.map((news) => (
              <tr
                key={news._id}
                className="border-b hover:bg-gray-50 transition duration-150"
              >
                <td className="px-4 py-2">
                  <img
                    src={`data:image/png;base64,${news.image}`}
                    alt={news.title}
                    className="w-12 h-12 object-cover rounded border"
                  />
                </td>
                <td className="px-4 py-2">{news.title}</td>
                <td className="px-4 py-2 text-center space-x-2">
                  <button
                    onClick={() => {
                      setSelected(news);
                      setOpenModal(true);
                    }}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded shadow"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(news._id)}
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
        <NewsModal
          isOpen={openModal}
          closeModal={() => setOpenModal(false)}
          news={selected}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default BlogsListPage;
