const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ["income", "expense"], default: "expense" },
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    note: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Expense", expenseSchema);
