const express = require("express");
const app = express();
const port = 3000;
const users = require("./data/users");
// const posts = require("./data/posts");
// const comments = require("./data/comments");

app.use(express.json());
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
  res.json(users);
});
app.post("/users", (req, res) => {
  console.log(req.body);
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email,
  };
  users.push(newUser);
  res.json(newUser);
  res.status(201);
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
