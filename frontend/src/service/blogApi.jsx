// src/api/newApi.js
import api from "../utils/api";

const NEW_API = "/api/blogs"; // thay đổi path nếu backend bạn quy định khác

export const getAllNews = async () => {
  const response = await api.get(NEW_API);
  return response.data;
};

export const getNewById = async (id) => {
  const response = await api.get(`${NEW_API}/${id}`);
  return response.data;
};

export const createNews = async (newItem) => {
  const response = await api.post(NEW_API, newItem);
  return response.data;
};

export const updateNews= async (id, newItem) => {
  const response = await api.put(`${NEW_API}/${id}`, newItem);
  return response.data;
};

export const deleteNews = async (id) => {
  const response = await api.delete(`${NEW_API}/${id}`);
  return response.data;
};
