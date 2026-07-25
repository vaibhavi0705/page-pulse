const express = require("express");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://page-pulse-ochre-sigma.vercel.app",
    ],
  })
);

app.use(express.json());

const auditRoutes = require("./routes/audit");

app.use("/audit", auditRoutes);

app.get("/", (req, res) => {
  res.send("Page Pulse API is running");
});

module.exports = app;