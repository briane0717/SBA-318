const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Front Page Headlines 📰");
});

app.listen(port, () => {
  console.log(`We have liftoff on port ${port} 🚀`);
});
