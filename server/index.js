const express = require("express");
const app = express();
const cors = require("cors");
const authRouter = require('./routes/auth');

// middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(5000, () => {
  console.log("Server has started on port 5000");
});