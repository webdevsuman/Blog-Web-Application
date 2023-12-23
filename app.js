//jshint esversion:6
import express from "express";
import bodyParser from "body-parser";
import _ from "lodash";

const homeStartingContent =
  "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent =
  "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent =
  "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();
const port = 3000;

let posts = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Homescreen
app.get("/", (req, res) => {
  res.render("home.ejs", {
    startingContent: homeStartingContent,
    posts: posts,
  });
});

// About page
app.get("/about", (req, res) => {
  res.render("about.ejs", {
    aboutContent: aboutContent,
  });
});

// Contact page
app.get("/contact", (req, res) => {
  res.render("contact.ejs", {
    contactContent: contactContent,
  });
});

// Create post
app.get("/compose", (req, res) => {
  res.render("compose.ejs");
});

app.post("/compose", (req, res) => {
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody,
  };
  posts.push(post);
  res.redirect("/");
});

// View Post
app.get("/posts/:postFull", (req, res) => {
  var requestedTitle = _.lowerCase(req.params.postFull);

  posts.forEach((post) => {
    var storedTitle = _.lowerCase(post.title);
    if (requestedTitle === storedTitle) {
      res.render("post.ejs", {
        postId: requestedTitle,
        storedTitle: post.title,
        storedContent: post.content,
      });
    }
  });
});

// Delete Post

app.post("/delete", (req, res) => {
  let index = req.body["postId"];
  console.log(index);
  posts.splice(index, 1);
  res.redirect("/");
});

// Edit Post Page
app.get("/edit/:id", (req, res) => {
  var requestedTitle = _.lowerCase(req.params.id);

  posts.forEach((post) => {
    var storedTitle = _.lowerCase(post.title);
    if (requestedTitle === storedTitle) {
      res.render("compose.ejs", {
        postId: storedTitle,
        storedTitle: post.title,
        storedContent: post.content,
      });
    }
  });
});

// Update Post
app.post("/update", (req, res) => {
  let title = req.body["title"];
  let content = req.body["content"];
  let index = req.body["index"];

  // Logic behind editing new data from Edit Form to the Arrey target Post

  var requestedTitle = _.lowerCase(index);

  posts.forEach((post) => {
    var storedTitle = _.lowerCase(post.title);
    if (requestedTitle === storedTitle) {
      post.title = title;
      post.content = content;
      // This last two lines is a game changer!
    }
  });
  res.redirect("/");
});

// Listening
app.listen(port, () => {
  console.log("Server started on port 3000");
});
