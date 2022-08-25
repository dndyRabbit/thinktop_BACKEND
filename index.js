require("dotenv").config();
const express = require("express");
const cors = require("cors");

const { sequelize } = require("./models");

const app = express();
app.use(express.json());

app.set("trust proxy", 1);

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
  })
);

//Routes
app.use("/api", require("./routes/auth.route"));
app.use("/api", require("./routes/sumber.route"));
app.use("/api", require("./routes/pemasukan.route"));

app.listen({ port: 2100 }, async () => {
  console.log("Server up on http://localhost:2100");
  await sequelize.authenticate();
  console.log("Database Connected!");
});
