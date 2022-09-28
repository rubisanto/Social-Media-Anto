const express = require("express");
const userRoutes = require("./routes/user.routes");
// variable environment
require("dotenv").config({ path: "./config/.env" });
require("./config/db");

const app = express();

// mettre la requette en json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/user", userRoutes);

// server
app.listen(process.env.PORT, () => {
  console.log("Server is running on port " + process.env.PORT);
});
