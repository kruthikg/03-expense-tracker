const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const expenseRoutes = require("./routes/expenses");

const app = express();

app.use(cors());
app.use(express.json());

// connect to MongoDB
if (process.env.MONGO_URI) {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("MongoDB connection error:", err.message));
} else {
  console.log("MONGO_URI is not set. Add it to your .env file.");
}

// simple route to check the server is running
app.get("/api/ping", (req, res) => {
  res.json({ message: "Server is running!" });
});

app.use("/api/expenses", expenseRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
