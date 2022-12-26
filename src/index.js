const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const userRoutes = require("./routes/user");
const favoriteRoutes = require("./routes/favorite");
const loginRoutes = require("./routes/login");

const app = express();
const port = process.env.PORT || 9000;

//Middleware
app.use(express.json());
// Permitir que se conecte a la API desde cualquier origen
const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use("/api", userRoutes);
app.use("/api", favoriteRoutes);
app.use("/api", loginRoutes);
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
