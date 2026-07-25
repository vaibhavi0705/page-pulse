const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://page-pulse-ochre-sigma.vercel.app/",
    ],
  })
);
app.use(express.json());

// Import Routes
const auditRoutes = require("./routes/audit");

// Use Routes
app.use("/audit", auditRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("Page Pulse API is running");
});

// Start Server
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});