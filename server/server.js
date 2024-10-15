require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { initializeConnection } = require("./config/database");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors({
  origin: [
    "http://localhost:3000",
  ],
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("*", (_, res) => {
  res.sendFile(path.resolve(__dirname, "../client/dist/index.html"));
});

const authRoutes = require("./routes/authRoutes");

app.use("/auth", authRoutes);


initializeConnection()
  .then((connection) => {
    const port = process.env.PORT || 9000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Error initializing database connection:", err);
  });