const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const chatRoute = require("./routes/chat");

const app = express();
app.use(cors);
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => console.log("error connecting to mongo", err));

app.use("/api", chatRoute);
app.get("./", (req, res) => {
  res.send("api get / works");
});

app.listen(PORT, () =>
  console.log(`Server is up and running at port: ${PORT}`)
);
