const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const userRoutes = require("./routes/user");
const favoriteRoutes = require("./routes/favorite");

const app = express();
const port = process.env.PORT || 9000;

//Middleware
app.use(express.json());
app.use('/api', userRoutes);
app.use('/api', favoriteRoutes);
//Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

//MongoDB Connection
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log("Server is running in http://localhost:" + port);
});
