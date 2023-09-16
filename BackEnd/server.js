const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const userRoutes = require("./Routes/userRoute");
app.use(cors());
app.use(express.json());
app.use(userRoutes);
const port = process.env.PORT;
const dbUrl = process.env.DBURL;

module.exports = {
  server: app,
  start: () => {
    mongoose
      .connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => console.log("connected to mongoDB"))
      .then(() => {
        app.listen(port, () => {
          console.log(`server is running on port ${port}`);
        });
      });
  },
};
