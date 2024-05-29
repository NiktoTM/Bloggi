// Importerar nödvändiga moduler
const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static('public')); // Serverar statiska filer från mappen "public"
app.use(bodyParser.urlencoded({ extended: true })); // Parsar URL-kodade formulärdata
app.set("view engine", "ejs"); // Ställer in EJS som vy-motor

let blogPosts = []; // Array för att lagra blogginlägg

// Hanterar GET-förfrågningar till rot-URL:en
app.get("/", (req, res) => {
  res.render("index.ejs", { blogPosts: blogPosts });
});

// Hanterar POST-förfrågningar till rot-URL:en för att lägga till ett nytt blogginlägg
app.post("/", (req, res) => {
  const blogText = req.body.blogtext;
  const author = req.body.author; 

  if (blogText) {
    blogPosts.push({ content: blogText, author: author });
  }

  res.redirect("/");
});

// Hanterar GET-förfrågningar till "/edit/:index" för att redigera ett blogginlägg
app.get("/edit/:index", (req, res) => {
  const index = req.params.index;
  const postToEdit = blogPosts[index];
  res.render("edit.ejs", { index: index, postToEdit: postToEdit });
});

// Hanterar POST-förfrågningar till "/edit/:index" för att spara redigerat blogginlägg
app.post("/edit/:index", (req, res) => {
  const index = req.params.index;
  const editedPost = req.body.editedPost;
  blogPosts[index].content = editedPost;
  res.redirect("/");
});

// Hanterar POST-förfrågningar till "/delete" för att ta bort ett blogginlägg
app.post("/delete", (req, res) => {
  const index = req.body.index;
  blogPosts.splice(index, 1);
  res.redirect("/");
});

// Startar servern och lyssnar på den angivna porten
app.listen(port, () => {
  console.log(`Servern körs på port ${port}`);
});
