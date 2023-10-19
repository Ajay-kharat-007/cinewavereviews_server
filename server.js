const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connecDb = require("./config/dbConnection");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
connecDb();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors())
app.use("/api/users", require("./routes/userRoutes"));
app.use("/", (req, res)=>{
  res.send("Server Is Running Perfectly !!")
})
app.use(errorHandler);

app.listen(port, () => {
  console.log(`server running on port http://localhost:${port}`);
});
