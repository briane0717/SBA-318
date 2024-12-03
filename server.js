const express = require("express");
const app = express();
const port = 3000;

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
