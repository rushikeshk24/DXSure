const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log("MongoDB connection error:", error.message));

app.use("/auth", require("./routes/authRoutes"));
app.use("/users", require("./routes/userRoutes"));
app.use("/clients", require("./routes/clientRoutes"));
app.use("/tickets", require("./routes/ticketRoutes"));
app.use("/payments", require("./routes/paymentRoutes"));
app.use("/dayplan", require("./routes/dayPlanRoutes"));
app.use("/vendors", require("./routes/vendorRoutes"));
app.use("/expenses", require("./routes/expenseRoutes"));
app.use("/dashboard", require("./routes/dashboardRoutes"));
app.use("/records", require("./routes/recordRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
