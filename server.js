require("dotenv").config();
const express = require('express');
const connectToDB = require("./config/connectDB");
const errorMiddleware = require("./middlewares/errorMiddleware");
const app = express()
const port = process.env.PORT || 3000
const userRoute = require('./routes/user');
const messageRoute = require('./routes/message');

//** Middleware
app.use(express.json());

//** Connect to MongoDB
connectToDB();


app.use('/api/v1/auth', userRoute);
app.use("/api/v1/message", messageRoute);

app.use('*', (req, res, next) => {
  return next(new ApiError("can't find this page", 404))
});

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})