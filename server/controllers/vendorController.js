const Vendor = require("../models/Vendor");

const createVendor = async (req, res) => {
  try {
    const vendor = await Vendor.create({ ...req.body, createdBy: req.user.id });
    res.status(201).json(vendor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find().sort({ createdAt: -1 });
    res.json(vendors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createVendor, getVendors };
