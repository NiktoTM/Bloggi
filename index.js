const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

let blogPosts = [];



app.get("/", (req, res) => {
  res.render("index.ejs", { blogPosts: blogPosts });
});

app.post("/", (req, res) => {
  const blogText = req.body.blogtext;
  const author = req.body.author; 
  
  if (blogText) {
    blogPosts.push({ content: blogText, author: author }); // Lägger till texten som ett inlägg utan att dela upp den
  }

  res.redirect("/");
});

app.get("/edit/:index", (req, res) => {
  const index = req.params.index;
  const postToEdit = blogPosts[index];
  res.render("edit.ejs", { index: index, postToEdit: postToEdit });
});

app.post("/edit/:index", (req, res) => {
  const index = req.params.index;
  const editedPost = req.body.editedPost;
  blogPosts[index].content = editedPost;
  res.redirect("/");
});

app.post("/delete", (req, res) => {
  const index = req.body.index;
  blogPosts.splice(index, 1);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Servern körs på port ${port}`);
});


