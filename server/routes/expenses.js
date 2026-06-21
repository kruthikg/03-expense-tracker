const express = require("express");
const router = express.Router();
const Expense = require("../models/Expense");

// get all expenses (newest first)
router.get("/", async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ date: -1 });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

// add a new expense
router.post("/", async (req, res) => {
  try {
    const { amount, category, note, date } = req.body;
    const expense = new Expense({ amount, category, note, date });
    const saved = await expense.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: "Could not add expense" });
  }
});

// update an expense
router.put("/:id", async (req, res) => {
  try {
    const updated = await Expense.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: "Could not update expense" });
  }
});

// delete an expense
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Expense.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.json({ message: "Expense deleted" });
  } catch (err) {
    res.status(400).json({ message: "Could not delete expense" });
  }
});

module.exports = router;
