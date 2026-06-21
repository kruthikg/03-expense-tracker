const express = require("express");
const router = express.Router();
const Expense = require("../models/Expense");
const auth = require("../middleware/auth");

// every route below needs the user to be logged in
router.use(auth);

// get the logged in user's expenses (newest first)
router.get("/", async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.userId }).sort({ date: -1 });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

// add a new expense for the logged in user
router.post("/", async (req, res) => {
  try {
    const { amount, category, note, date } = req.body;
    const expense = new Expense({
      user: req.userId,
      amount,
      category,
      note,
      date,
    });
    const saved = await expense.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: "Could not add expense" });
  }
});

// update an expense (only if it belongs to the user)
router.put("/:id", async (req, res) => {
  try {
    const updated = await Expense.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: "Could not update expense" });
  }
});

// delete an expense (only if it belongs to the user)
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Expense.findOneAndDelete({
      _id: req.params.id,
      user: req.userId,
    });
    if (!deleted) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.json({ message: "Expense deleted" });
  } catch (err) {
    res.status(400).json({ message: "Could not delete expense" });
  }
});

module.exports = router;
