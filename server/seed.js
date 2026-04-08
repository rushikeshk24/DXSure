const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

const User = require("./models/User");
const Client = require("./models/Client");
const Ticket = require("./models/Ticket");
const Payment = require("./models/Payment");
const DayPlan = require("./models/DayPlan");
const Vendor = require("./models/Vendor");
const Expense = require("./models/Expense");

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected for seeding");

    await Promise.all([
      User.deleteMany({}),
      Client.deleteMany({}),
      Ticket.deleteMany({}),
      Payment.deleteMany({}),
      DayPlan.deleteMany({}),
      Vendor.deleteMany({}),
      Expense.deleteMany({}),
    ]);

    const hashedAdminPassword = await bcrypt.hash("123456", 10);
    const hashedEmployeePassword = await bcrypt.hash("123456", 10);

    const admin = await User.create({
      name: "Rushi",
      email: "admin@gmail.com",
      password: hashedAdminPassword,
      role: "admin",
    });

    const employee = await User.create({
      name: "Employee User",
      email: "employee@gmail.com",
      password: hashedEmployeePassword,
      role: "employee",
    });

    await Client.insertMany([
      {
        name: "Rahul Kumar",
        email: "rahul@mail.com",
        phone: "9876543210",
        company: "RK Traders",
        category: "enquiry",
        status: "new",
        followStatus: "pending",
        createdBy: employee._id,
      },
      {
        name: "Priya Singh",
        email: "priya@mail.com",
        phone: "9988776655",
        company: "Singh Exports",
        category: "lead",
        status: "in_progress",
        followStatus: "called",
        createdBy: employee._id,
      },
      {
        name: "Amit Shah",
        email: "amit@mail.com",
        phone: "9123456780",
        company: "AS Retail",
        category: "client",
        status: "won",
        followStatus: "converted",
        createdBy: employee._id,
      },
    ]);

    await Ticket.insertMany([
      {
        title: "Server check",
        description: "Check CRM server logs once.",
        priority: "medium",
        assignedTo: employee._id,
        createdBy: admin._id,
        status: "open",
      },
      {
        title: "Client callback",
        description: "Call pending lead clients.",
        priority: "high",
        assignedTo: employee._id,
        createdBy: admin._id,
        status: "open",
      },
    ]);

    await DayPlan.insertMany([
      {
        task: "Call 5 new enquiries",
        date: new Date(),
        status: "pending",
        createdBy: employee._id,
      },
      {
        task: "Prepare daily report",
        date: new Date(),
        status: "pending",
        createdBy: employee._id,
      },
    ]);

    await Vendor.insertMany([
      {
        name: "Office Mart",
        email: "contact@officemart.com",
        phone: "9000000001",
        address: "Main Road, City",
        createdBy: employee._id,
      },
    ]);

    await Payment.insertMany([
      {
        paymentType: "employee",
        name: "Employee User",
        amount: 15000,
        note: "Monthly salary",
        createdBy: admin._id,
      },
      {
        paymentType: "client",
        name: "Amit Shah",
        amount: 25000,
        note: "Advance payment",
        createdBy: employee._id,
      },
    ]);

    await Expense.insertMany([
      {
        type: "income",
        title: "Client payment received",
        amount: 25000,
        note: "Invoice INV-101",
        createdBy: admin._id,
      },
      {
        type: "expense",
        title: "Office stationery",
        amount: 1500,
        note: "Pens and notebooks",
        createdBy: employee._id,
      },
    ]);

    console.log("Seed completed successfully");
    console.log("Admin login: admin@dxsure.com / admin123");
    console.log("Employee login: employee@dxsure.com / emp123");

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("Seed failed:", error.message);
    await mongoose.connection.close();
    process.exit(1);
  }
};

seedData();
