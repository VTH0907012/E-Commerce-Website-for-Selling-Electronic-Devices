// import axios from 'axios';
import api from "../utils/api";
const API = '/api/products';

export const getAllProducts = async () => {
  const res = await api.get(API);
  return res.data;
};

export const createProduct = async (product) => {
  const res = await api.post(API, product);
  return res.data;
};

export const updateProduct = async (id, product) => {
  const res = await api.put(`${API}/${id}`, product);
  return res.data;
};

export const deleteProduct = async (id) => {
  const res = await api.delete(`${API}/${id}`);
  return res.data;
};
export const getProductById = async (id) => {
  const res = await api.get(`${API}/${id}`);
  return res.data;
};
// export const getRelatedProducts = async (categoryId, currentProductId) => {
//   const res = await api.get(`/api/products?category=${categoryId}`);
//   const filteredProducts = res.data.filter(p => p._id !== currentProductId); // Bỏ sản phẩm hiện tại
//   return filteredProducts.slice(0, 4); // Giới hạn 4 sản phẩm
// };