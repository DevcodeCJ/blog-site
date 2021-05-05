const express = require("express");
// const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes.js");
const mongoString = require("./mongoString.js");

// Setup Express App & Port
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
const dbURI = mongoString;
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((response) => {
    // Launch Express App once connected to db
    console.log("Connected to the database");
    app.listen(PORT);
  })
  .catch((err) => console.log(err));

// Access to Form Data
app.use(express.urlencoded({ extended: true }));
// app.use(morgan("dev"));

// Register View Engine
app.set("view engine", "ejs");

// Blog Routes
app.use("/", blogRoutes);

// Access to Static Files
app.use(express.static("public"));

// 404 Page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
  // res.status(404).sendFile("/views/404.html", { root: __dirname });
});
