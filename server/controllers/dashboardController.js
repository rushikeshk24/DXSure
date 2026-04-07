const User = require("../models/User");
const Ticket = require("../models/Ticket");
const Client = require("../models/Client");
const DayPlan = require("../models/DayPlan");
const Expense = require("../models/Expense");

const getSummary = async (req, res) => {
  try {
    const [users, tickets, clients, dayPlans, expenses] = await Promise.all([
      User.countDocuments(),
      Ticket.countDocuments(),
      Client.countDocuments(),
      DayPlan.countDocuments(),
      Expense.countDocuments(),
    ]);

    res.json({ users, tickets, clients, dayPlans, expenses });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getSummary };
