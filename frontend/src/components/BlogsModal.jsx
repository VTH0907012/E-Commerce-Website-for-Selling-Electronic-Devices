import React, { useEffect, useState } from "react";

const NewModal = ({ isOpen, closeModal, news, onSave }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isPublished, setIsPublished] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (news) {
        setTitle(news.title || "");
        setContent(news.content || "");
        setIsPublished(news.isPublished || false);
        if (news.image) {
          setPreview(`data:image/png;base64,${news.image}`);
          setImage(news.image);  // Giữ ảnh cũ nếu có
        }
      } else {
        resetForm();
      }
    }
  }, [isOpen, news]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result.split(",")[1];
        setImage(base64);
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      title,
      content,
      image: image || news?.image, // Giữ ảnh cũ nếu không thay đổi
      isPublished,
    };

    if (news && news._id) {
      formData._id = news._id;
    }

    onSave(formData);
    resetForm();
    closeModal();
  };

  const handleClose = () => {
    resetForm();
    closeModal();
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
    setImage(null);
    setPreview(null);
    setIsPublished(false);
  };

  return (
    <div
      className={`fixed inset-0 bg-[rgba(0,0,0,0.3)] flex items-center justify-center z-50 ${isOpen ? "block" : "hidden"}`}
      onClick={handleClose}
    >
      <div
        className="bg-white p-6 rounded shadow-lg w-full max-w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={handleSubmit}>
          <h2 className="text-xl font-bold mb-4">
            {news ? "Chỉnh sửa Tin tức" : "Thêm Tin tức"}
          </h2>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Tiêu đề:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full p-2 border rounded"
              placeholder="Nhập tiêu đề"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Nội dung:</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows={4}
              className="w-full p-2 border rounded resize-none"
              placeholder="Nhập nội dung tin tức"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Hình ảnh:</label>
            <div className="flex items-center space-x-4">
              <label
                htmlFor="image"
                className="bg-blue-500 text-white px-3 py-1 rounded cursor-pointer hover:bg-blue-700 transition"
              >
                Chọn ảnh
              </label>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
            {preview && (
              <div className="mt-2">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-24 h-24 object-cover rounded border"
                />
              </div>
            )}
          </div>

          <div className="mb-4 flex items-center space-x-2">
            <input
              type="checkbox"
              id="isPublished"
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
            />
            <label htmlFor="isPublished" className="text-sm font-medium">
              Đăng bài ngay
            </label>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded mr-2"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              {news ? "Lưu" : "Thêm"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewModal;
