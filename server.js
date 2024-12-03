const express = require("express");
const app = express();
const port = 3000;
const users = require("./data/users");
const posts = require("./data/posts");
const comments = require("./data/comments");

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.static("public"));
function authenticate(req, res, next) {
  if (!req.headers["authorization"]) {
    return res.status(401).json({ message: "Unauthorized access" });
  }
  next();
}

app.get("/dashboard", authenticate, (req, res) => {
  res.send("Welcome to the Admin Dashboard");
});

app.get("/", (req, res) => {
  res.send("Front Page Headlines 📰");
});

app.get("/users", (req, res) => {
  let filteredUsers = users;
  if (req.query.name) {
    filteredUsers = filteredUsers.filter((user) =>
      user.name.toLowerCase().includes(req.query.name.toLowerCase())
    );
  }
  res.render("index", { users: filteredUsers });
});

app.get("/posts", (req, res) => {
  const { title, content } = req.query;

  let filteredPosts = posts;

  if (title) {
    filteredPosts = filteredPosts.filter((post) =>
      post.title.toLowerCase().includes(title.toLowerCase())
    );
  }

  if (content) {
    filteredPosts = filteredPosts.filter((post) =>
      post.content.toLowerCase().includes(content.toLowerCase())
    );
  }

  res.json(filteredPosts);
});

app.get("/comments", (req, res) => {
  let filteredComments = comments;

  if (req.query.postId) {
    filteredComments = filteredComments.filter(
      (comment) => comment.postId == req.query.postId
    );
  }

  res.json(filteredComments);
});
app.post("/users", (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email,
  };
  users.push(newUser);
  res.status(201);
  res.json(newUser);
});

app.post("/posts", (req, res) => {
  const newPost = {
    id: posts.length + 1,
    title: req.body.title,
    content: req.body.content,
  };
  posts.push(newPost);
  res.status(201);
  res.json(newPost);
});

app.post("/comments", (req, res) => {
  const newComment = {
    id: comments.length + 1,
    postId: req.body.postId,
    content: req.body.content,
  };
  comments.push(newComment);
  res.status(201);
  res.json(newComment);
});

app.put("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find((user) => user.id === userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  res.json(user);
});

app.delete("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex((user) => user.id === userId);
  if (userIndex === -1) {
    return res.status(404).json({ message: "User not found" });
  }
  users.splice(userIndex, 1);
  res.status(204).send();
});

app.use((req, res) => {
  console.log(
    "I am only in this middleware if no other routes have sent a response."
  );
  res.status(404);
  res.json({ error: "Resource not found" });
});
app.listen(port, () => {
  console.log(`We have liftoff on port ${port} 🚀`);
});
