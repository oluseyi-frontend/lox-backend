const express = require("express");
const app = express();


const registerRoute = require('./routes/auth/register')
const loginRoute = require("./routes/auth/login");

const cors = require('cors')

const mongoose = require("mongoose");

require("dotenv").config();

app.use(express.json());
app.use(cors());

//app.use('/dashboard/api/functions', functionRouter)
app.use('/api/auth/register', registerRoute);
app.use("/api/auth/login", loginRoute);


app.get('/', (req, res) => {
   res.send("welcome to lox services API");
})

app.use((req, res, next) => {
  const error = new Error(`not found = ${req.originalUrl}`);
  res.status(404);
  next(error);
});
app.use((error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: error.message,
  });
});



mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("connected to MongoDb");
  }
);


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});


