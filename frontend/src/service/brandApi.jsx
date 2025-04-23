import api from "../utils/api";

export const getBrands = async () => {
  const res = await api.get("/api/brands");
  return res.data;
};

export const deleteBrand = async (id) => {
  return await api.delete(`/api/brands/${id}`);
};

export const updateBrand = async (id, data) => {
  return await api.put(`/api/brands/${id}`, data);
};

export const createBrand = async (data) => {
  return await api.post("/api/brands", data);
};
