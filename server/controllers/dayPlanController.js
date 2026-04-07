const DayPlan = require("../models/DayPlan");

const createDayPlan = async (req, res) => {
  try {
    const dayPlan = await DayPlan.create({
      ...req.body,
      createdBy: req.user.id,
    });
    res.status(201).json(dayPlan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getDayPlans = async (req, res) => {
  try {
    const dayPlans = await DayPlan.find()
      .populate("createdBy", "name")
      .sort({ createdAt: -1 });
    res.json(dayPlans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createDayPlan, getDayPlans };
