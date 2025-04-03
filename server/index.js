const express = require("express");
const app = express();
const cors = require("cors");
const authRouter = require('./routes/auth');
const adminRouter = require('./routes/admin');
const swaggerUi = require('swagger-ui-express');
const specs = require('./swagger');

// middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRouter);
app.use('/api/admin', adminRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(5001, () => {
  console.log("Server has started on port 5001");
});