const Category = require("../models/Category");

exports.getAllCategories = async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
};

exports.createCategory = async (req, res) => {
  const newCat = new Category(req.body);
  await newCat.save();
  res.status(201).json(newCat);
};

exports.updateCategory = async (req, res) => {
  const updated = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

exports.deleteCategory = async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};


// exports.createCategory = async (req, res) => {
//   try {
//     const { name, icon } = req.body; // icon là chuỗi base64

//     if (!name || !icon) {
//       return res.status(400).json({ error: "Thiếu tên hoặc icon." });
//     }

//     const newCat = new Category({ name, icon }); // lưu base64 trực tiếp

//     await newCat.save();
//     res.status(201).json(newCat);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.getAllCategories = async (req, res) => {
//   try {
//     const categories = await Category.find();
//     res.json(categories);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.updateCategory = async (req, res) => {
//   try {
//     const updated = await Category.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });
//     res.json(updated);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.deleteCategory = async (req, res) => {
//   try {
//     await Category.findByIdAndDelete(req.params.id);
//     res.json({ message: "Deleted" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
