/* src/pages/NewsOverviewPage.jsx */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllNews } from "../../service/blogApi";
import { toast } from "react-toastify";

const ITEMS_PER_PAGE = 6;

const BlogsOverviewPage = () => {
  const [newsList, setNewsList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchNews = async () => {
    try {
      const data = await getAllNews();
      setNewsList(data.filter((item) => item.isPublished));  // Lọc bài viết đã được xuất bản
    } catch (error) {
      console.error(error);
      toast.error("Lỗi khi tải tin tức");
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  if (!newsList.length) {
    return <div className="p-6">Đang tải tin tức...</div>;
  }

  // Tách phần bài viết đầu tiên và phần còn lại
  const featured = newsList[0];
  const restItems = newsList.slice(1);

  // Phân trang cho phần còn lại
  const paginatedRest = restItems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  const totalPages = Math.ceil(restItems.length / ITEMS_PER_PAGE);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Tin tức mới nhất:</h1>

      {/* Bài viết nổi bật */}
      <div className="mb-12 bg-white rounded-lg shadow overflow-hidden">
        <Link to={`/blogs/${featured._id}`} className="block hover:opacity-90 transition">
          {featured.image && (
            <img
              src={`data:image/png;base64,${featured.image}`} // Cập nhật lại cú pháp cho src
              alt={featured.title}
              className="w-full h-64 object-cover"
            />
          )}
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              {featured.title}
            </h2>
            <p className="text-gray-600">
              {featured.content.substring(0, 200)}...
            </p>
          </div>
        </Link>
      </div>
      <hr className="my-8 border-t-2 border-gray-300" />

      {/* Danh sách tin nhỏ */}
      <div className="space-y-6">
        {paginatedRest.map((item) => (
          <Link
            key={item._id}
            to={`/blogs/${item._id}`}  // Cập nhật lại cú pháp cho src
            className="flex bg-white rounded-lg shadow hover:shadow-md transition overflow-hidden"
          >
            {item.image && (
              <img
                src={`data:image/png;base64,${item.image}`} // Cập nhật lại cú pháp cho src
                alt={item.title}
                className="w-40 h-24 object-cover"
              />
            )}
            <div className="p-4 flex-1">
              <h3 className="text-xl font-medium text-gray-800 hover:text-blue-600 mb-1">
                {item.title}
              </h3>
              <div className="text-sm text-gray-500 mb-2">
                {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} {' '}
                {new Date(item.createdAt).toLocaleDateString()}
              </div>
              <p className="text-gray-600">
                {item.content.substring(0, 100)}...
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Phân trang */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center space-x-2">
          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === idx + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogsOverviewPage;
