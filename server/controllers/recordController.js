const Ticket = require("../models/Ticket");
const DayPlan = require("../models/DayPlan");

const getRecords = async (req, res) => {
  try {
    const { user, date } = req.query;
    const ticketQuery = {};
    const dayPlanQuery = {};

    if (user) {
      ticketQuery.createdBy = user;
      dayPlanQuery.createdBy = user;
    }

    if (date) {
      const start = new Date(date);
      const end = new Date(date);
      end.setDate(end.getDate() + 1);
      ticketQuery.createdAt = { $gte: start, $lt: end };
      dayPlanQuery.createdAt = { $gte: start, $lt: end };
    }

    const [tickets, dayPlans] = await Promise.all([
      Ticket.find(ticketQuery).populate("createdBy", "name"),
      DayPlan.find(dayPlanQuery).populate("createdBy", "name"),
    ]);

    const logs = [
      ...tickets.map((item) => ({
        type: "ticket",
        title: item.title,
        user: item.createdBy?.name || "N/A",
        date: item.createdAt,
      })),
      ...dayPlans.map((item) => ({
        type: "dayplan",
        title: item.task,
        user: item.createdBy?.name || "N/A",
        date: item.createdAt,
      })),
    ].sort((a, b) => new Date(b.date) - new Date(a.date));

    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getRecords };
