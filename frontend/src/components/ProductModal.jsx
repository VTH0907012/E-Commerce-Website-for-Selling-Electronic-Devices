// import React, { useEffect, useState } from 'react';
// import { createProduct, updateProduct } from '../service/productApi';
// import { getAllCategories } from '../service/categoryApi';
// import { getBrands } from '../service/brandApi';

// const ProductModal = ({ data, onClose }) => {
//   const [form, setForm] = useState({
//     name: '',
//     description: '',
//     price: '',
//     quantity: '',
//     category: '',
//     brand: '',
//   });

//   const [categories, setCategories] = useState([]);
//   const [brands, setBrands] = useState([]);

//   useEffect(() => {
//     if (data) {
//       setForm({
//         name: data.name || '',
//         description: data.description || '',
//         price: data.price || '',
//         quantity: data.quantity || '',
//         category: data.category?._id || '',
//         brand: data.brand?._id || '',
//       });
//     }
//     fetchSelectData();
//   }, [data]);

//   const fetchSelectData = async () => {
//     try {
//       const [catsRes, brandsRes] = await Promise.all([
//         getAllCategories(),
//         getBrands(),
//       ]);
//       setCategories(Array.isArray(catsRes.data) ? catsRes.data : []);
//       setBrands(Array.isArray(brandsRes) ? brandsRes : []);
//     } catch (error) {
//       console.error('Lỗi khi lấy danh mục hoặc nhãn hiệu:', error);
//       setCategories([]);
//       setBrands([]);
//     }
//   };

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async () => {
//     try {
//       if (data) {
//         await updateProduct(data._id, form);
//       } else {
//         await createProduct(form);
//       }
//       onClose();
//     } catch (error) {
//       console.error('Lỗi khi gửi sản phẩm:', error);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-[rgba(0,0,0,0.3)] bg-opacity-40 flex justify-center items-center z-50">
//       <div className="bg-white rounded p-6 w-[500px]">
//         <h2 className="text-xl font-semibold mb-4">
//           {data ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm'}
//         </h2>

//         <div className="space-y-3">
//           <input name="name" value={form.name} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Tên sản phẩm" />
//           <input name="description" value={form.description} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Mô tả" />
//           <input name="price" value={form.price} onChange={handleChange} type="number" className="w-full p-2 border rounded" placeholder="Giá" />
//           <input name="quantity" value={form.quantity} onChange={handleChange} type="number" className="w-full p-2 border rounded" placeholder="Số lượng" />

//           <select name="category" value={form.category} onChange={handleChange} className="w-full p-2 border rounded">
//             <option value="">Chọn danh mục</option>
//             {Array.isArray(categories) &&
//               categories.map((cat) => (
//                 <option key={cat._id} value={cat._id}>{cat.name}</option>
//               ))}
//           </select>

//           <select name="brand" value={form.brand} onChange={handleChange} className="w-full p-2 border rounded">
//             <option value="">Chọn nhãn hiệu</option>
//             {Array.isArray(brands) &&
//               brands.map((brand) => (
//                 <option key={brand._id} value={brand._id}>{brand.name}</option>
//               ))}
//           </select>
//         </div>

//         <div className="flex justify-end gap-2 mt-4">
//           <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Huỷ</button>
//           <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded">
//             {data ? 'Cập nhật' : 'Thêm'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductModal;
import React, { useEffect, useState } from "react";
import { createProduct, updateProduct } from "../service/productApi";
import { getAllCategories } from "../service/categoryApi";
import { getBrands } from "../service/brandApi";

const ProductModal = ({ data, onClose }) => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    category: "",
    brand: "",
    image: "",
  });

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [preview, setPreview] = useState("");

  // useEffect(() => {
  //   if (data) {
  //     setForm({
  //       name: data.name || "",
  //       description: data.description || "",
  //       price: data.price || "",
  //       quantity: data.quantity || "",
  //       category: data.category?._id || "",
  //       brand: data.brand?._id || "",
  //       image: data.image || "",
  //     });
  //     setPreview(data.image || "");
  //   }
  //   fetchSelectData();
  // }, [data]);
  useEffect(() => {
    if (data) {
      setForm({
        name: data.name || "",
        description: data.description || "",
        price: data.price || "",
        quantity: data.quantity || "",
        category: data.category?._id || "",
        brand: data.brand?._id || "",
        image: data.image || "",
      });
  
      // Nếu là base64, thêm tiền tố để hiển thị ảnh
      if (data.image) {
        setPreview(`data:image/png;base64,${data.image}`);
      } else {
        setPreview("");
      }
    }
    fetchSelectData();
  }, [data]);


  const fetchSelectData = async () => {
    try {
      const [catsRes, brandsRes] = await Promise.all([
        getAllCategories(),
        getBrands(),
      ]);
      setCategories(Array.isArray(catsRes.data) ? catsRes.data : []);
      setBrands(Array.isArray(brandsRes) ? brandsRes : []);
    } catch (error) {
      console.error("Lỗi khi lấy danh mục hoặc nhãn hiệu:", error);
      setCategories([]);
      setBrands([]);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setForm({ ...form, image: reader.result });
  //       setPreview(reader.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       const base64String = reader.result.split(",")[1]; // chỉ lấy phần base64
  //       setForm({ ...form, image: base64String });
  //       setPreview(reader.result); // full string để preview
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.split(",")[1];
        setForm({ ...form, image: base64String });
        setPreview(reader.result); // Hiển thị preview dùng full base64 string
      };
      reader.readAsDataURL(file);
    }
  };
  

  const handleSubmit = async () => {
    try {
      if (data) {
        await updateProduct(data._id, form);
      } else {
        await createProduct(form);
      }
      onClose();
    } catch (error) {
      console.error("Lỗi khi gửi sản phẩm:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.3)] bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded p-6 w-[500px]">
      <h2 className="text-xl font-bold mb-4">
      {data ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}
        </h2>
          <hr className="border-t border-gray-600 opacity-50" />

        <div className="space-y-3 mt-4">
          {/* Tên sản phẩm */}
          <div className="flex items-center gap-4">
            <label htmlFor="name" className="text-sm font-semibold w-1/3">
              Tên sản phẩm:
            </label>
            <input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-2/3 p-2 border rounded"
              placeholder="Tên sản phẩm"
            />
          </div>

          {/* Mô tả */}
          <div className="flex items-center gap-4">
            <label
              htmlFor="description"
              className="text-sm font-semibold w-1/3"
            >
              Mô tả:
            </label>
            <input
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-2/3 p-2 border rounded"
              placeholder="Mô tả"
            />
          </div>

          {/* Giá */}
          <div className="flex items-center gap-4">
            <label htmlFor="price" className="text-sm font-semibold w-1/3">
              Giá:
            </label>
            <input
              id="price"
              name="price"
              value={form.price}
              onChange={handleChange}
              type="number"
              className="w-2/3 p-2 border rounded"
              placeholder="Giá"
            />
          </div>

          {/* Số lượng */}
          <div className="flex items-center gap-4">
            <label htmlFor="quantity" className="text-sm font-semibold w-1/3">
              Số lượng:
            </label>
            <input
              id="quantity"
              name="quantity"
              value={form.quantity}
              onChange={handleChange}
              type="number"
              className="w-2/3 p-2 border rounded"
              placeholder="Số lượng"
            />
          </div>

          {/* Danh mục */}
          <div className="flex items-center gap-4">
            <label htmlFor="category" className="text-sm font-semibold w-1/3">
              Danh mục:
            </label>
            <select
              id="category"
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-2/3 p-2 border rounded"
            >
              <option value="">Chọn danh mục</option>
              {Array.isArray(categories) &&
                categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
            </select>
          </div>

          {/* Nhãn hiệu */}
          <div className="flex items-center gap-4">
            <label htmlFor="brand" className="text-sm font-semibold w-1/3">
              Nhãn hiệu:
            </label>
            <select
              id="brand"
              name="brand"
              value={form.brand}
              onChange={handleChange}
              className="w-2/3 p-2 border rounded"
            >
              <option value="">Chọn nhãn hiệu</option>
              {Array.isArray(brands) &&
                brands.map((brand) => (
                  <option key={brand._id} value={brand._id}>
                    {brand.name}
                  </option>
                ))}
            </select>
          </div>

          {/* Hình ảnh */}
          {/* <div className="flex items-center gap-4">
            <label htmlFor="icon" className="text-sm font-semibold w-1/3">
              Hình ảnh:
            </label>
            <div className="w-2/3 space-y-2">
              <label
                htmlFor="icon"
                className="inline-block px-2 py-1 bg-blue-400 text-white rounded cursor-pointer hover:bg-blue-700 transition"
              >
                Chọn ảnh
              </label>
              <input
                type="file"
                id="icon"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              {preview && (
                <div>
                  <img
                    src={preview}
                    
                    alt="Preview"
                    className="w-20 h-20 object-contain rounded"
                  />
                </div>
              )}
            </div>
          </div> */}
          {/* Hình ảnh */}
          <div className="flex items-start gap-4">
            <label htmlFor="image" className="text-sm font-semibold w-1/3">
              Hình ảnh:
            </label>
            <div className="w-2/3 space-y-2">
              <label
                htmlFor="image"
                className="inline-block px-3 py-1 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-700 transition"
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
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-20 h-20 object-contain rounded border"
                />
              )}
            </div>
          </div>


        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
            Huỷ
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            {data ? "Cập nhật" : "Thêm"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
