const mongoose = require("mongoose");

const dayPlanSchema = new mongoose.Schema(
  {
    task: { type: String, required: true },
    date: { type: Date, required: true },
    status: { type: String, default: "pending" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true },
);

module.exports = mongoose.model("DayPlan", dayPlanSchema);
