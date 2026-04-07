const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    paymentType: {
      type: String,
      enum: ["employee", "client"],
      required: true,
    },
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    note: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Payment", paymentSchema);
