const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDb = require("./config/connectDb");
const bcrypt = require("bcrypt");
// config ,env
dotenv.config();
// database call
connectDb();

const app = express();

// middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

// routes
// user routes
app.use("/api/v1/users", require("./routes/userRoute"));
// transaction routes
app.use("/api/v1/transactions", require("./routes/transactionRoutes"));
// port
const PORT = 8000 || process.env.PORT;

// listen

app.listen(PORT, () => {
  console.log(`server is running in ${PORT}`);
});
