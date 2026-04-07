const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: String,
    phone: String,
    company: String,
    category: {
      type: String,
      enum: ["enquiry", "lead", "client"],
      default: "client",
    },
    status: { type: String, default: "new" },
    followStatus: { type: String, default: "pending" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Client", clientSchema);
