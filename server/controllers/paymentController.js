const Payment = require("../models/Payment");

const createPayment = async (req, res) => {
  try {
    const payment = await Payment.create({
      ...req.body,
      createdBy: req.user.id,
    });
    res.status(201).json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPayments = async (req, res) => {
  try {
    const { paymentType } = req.query;
    const query = paymentType ? { paymentType } : {};
    const payments = await Payment.find(query).sort({ createdAt: -1 });
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createPayment, getPayments };
