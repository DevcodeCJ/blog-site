const express = require("express");
// const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes.js");
const mongoString = require("./mongoString.js");

// Setup Express App & Port
const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT);

// Connect to MongoDB
const dbURI = mongoString;
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((response) => {
    // Launch Express App once connected to db
    console.log("Connected to the database");
  })
  .catch((err) => console.log(err));

// Middleware
app.use(express.static("public"));
// Access to Form Data
app.use(express.urlencoded({ extended: true }));
// app.use(morgan("dev"));

// app.use((req, res, next) => {
//   console.log("New request made:");
//   console.log("Host: ", req.hostname);
//   console.log("Path: ", req.path);
//   console.log("Method: ", req.method);
//   next();
// });

// Mongoose and Mongo Sandbox Routes
// app.get("/add-blog", (req, res) => {
//   const blog = new Blog({
//     title: "New Blog 3",
//     snippet: "About my new blog",
//     body: "More about my new blog",
//   });
//   blog
//     .save()
//     .then((response) => {
//       res.send(response);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// app.get("/all-blogs", (req, res) => {
//   Blog.find()
//     .then((response) => {
//       res.send(response);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// app.get("/single-blog", (req, res) => {
//   Blog.findById("6069c67b231f6c05bfbf8159")
//     .then((response) => {
//       res.send(response);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// Listen for Requests | Routes
app.get("/", (req, res) => {
  res.redirect("/blogs");
  // const blogs = [
  //   {
  //     title: "Yoshi finds eggs",
  //     snippet: "Lorem ipsum dolor sit amet consectetur adipisicing",
  //   },
  //   {
  //     title: "Mario finds stars",
  //     snippet: "Lorem ipsum dolor sit amet consectetur adipisicing",
  //   },
  //   {
  //     title: "How to defeat Bowser",
  //     snippet: "Lorem ipsum dolor sit amet consectetur adipisicing",
  //   },
  // ];
  // res.render("index", { title: "Home", blogs });
  // res.status(200).sendFile("./views/index.html", { root: __dirname });
  // res.send("<h1>Home Page</h1>");
  // console.log(__dirname);
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
  // res.status(200).sendFile("./views/about.html", { root: __dirname });
});

// Blog Routes
app.use("/", blogRoutes);

// Redirects
app.get("/about-us", (req, res) => {
  res.redirect("/about");
});

// Register View Engine
app.set("view engine", "ejs");

// 404 Page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
  // res.status(404).sendFile("/views/404.html", { root: __dirname });
});
