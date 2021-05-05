const Blog = require("../models/blog");
// NAMING CONVENTION --> blog_index, blog_create_post, blog_create_get, blog_details, blog_delete

const blog_index = (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((response) => {
      res.render("index", { title: "All Blogs", blogs: response });
    })
    .catch((err) => {
      console.log(err);
    });
};

const blog_create_post = (req, res) => {
  const blog = new Blog(req.body);

  blog
    .save()
    .then((response) => {
      res.redirect("/blogs");
    })
    .catch((err) => {
      console.log(err);
    });
};

const blog_create_get = (req, res) => {
  res.render("create");
};

const blog_details = (req, res) => {
  const id = req.params.id;

  Blog.findById(id)
    .then((response) => {
      res.render("details", { blog: response, title: "Blog Details" });
    })
    .catch((err) => {
      console.log(err);
    });
};

const blog_delete = (req, res) => {
  const id = req.params.id;

  Blog.findByIdAndDelete(id)
    .then((response) => {
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  blog_index,
  blog_create_post,
  blog_create_get,
  blog_details,
  blog_delete,
};
