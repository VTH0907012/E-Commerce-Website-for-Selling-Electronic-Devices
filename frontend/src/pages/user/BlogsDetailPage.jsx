/* src/pages/NewsDetailPage.jsx */
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getNewById } from "../../service/blogApi";
import { toast } from "react-toastify";

const BlogsDetailPage = () => {
  const { id } = useParams();
  const [news, setNews] = useState(null);

  const fetchNews = async () => {
    try {
      const data = await getNewById(id);
      setNews(data);
    } catch (error) {
      console.error(error);
      toast.error("Lỗi khi tải chi tiết tin tức");
    }
  };

  useEffect(() => {
    fetchNews();
  }, [id]);

  if (!news) {
    return <div className="p-6 text-center text-lg">Đang tải...</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Link
        to="/blogs"
        className="text-blue-600 hover:text-blue-800 transition duration-200 mb-6 inline-block"
      >
        &larr; Quay về danh sách
      </Link>
      <h1 className="text-4xl font-bold text-gray-800 mb-6">{news.title}</h1>
      {news.image && (
        <img
          src={`data:image/png;base64,${news.image}`}
          alt={news.title}
          className="w-full h-96 object-cover rounded-xl mb-8 shadow-lg"
        />
      )}
      <div className="prose prose-lg text-gray-700">
        {news.content.split("\n").map((line, idx) => (
          <p key={idx}>{line}</p>
        ))}
      </div>
    </div>
  );
};

export default BlogsDetailPage;
