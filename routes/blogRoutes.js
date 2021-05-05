const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController.js");

router.get("/", (req, res) => {
  res.redirect("/blogs");
});

router.get("/about", (req, res) => {
  res.render("about");
  // res.status(200).sendFile("./views/about.html", { root: __dirname });
});

router.get("/blogs", blogController.blog_index);

router.post("/blogs", blogController.blog_create_post);

router.get("/blogs/create", blogController.blog_create_get);

router.get("/blogs/:id", blogController.blog_details);

router.delete("/blogs/:id", blogController.blog_delete);

module.exports = router;
