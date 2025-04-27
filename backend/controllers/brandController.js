const Brand = require('../models/Brand');

// CREATE
const createBrand = async (req, res) => {
  try {
    const brand = new Brand(req.body);
    await brand.save();
    res.status(201).json(brand);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET ALL
const getAllBrands = async (req, res) => {
  try {
    const brands = await Brand.find();
    res.json(brands);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ONE
const getBrandById = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);
    if (!brand) return res.status(404).json({ error: 'Nhãn hiệu không tìm thấy' });
    res.json(brand);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
const updateBrand = async (req, res) => {
  try {
    const updated = await Brand.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE
const deleteBrand = async (req, res) => {
  try {
    await Brand.findByIdAndDelete(req.params.id);
    res.json({ message: 'Brand deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createBrand,
  getAllBrands,
  getBrandById,
  updateBrand,
  deleteBrand,
};
