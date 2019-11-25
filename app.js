const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const db = require("./config/database");
const auth = require("./routes/auth");
const post = require("./routes/posts");
const app = express();

//septup middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use("/api", auth);
app.use("/api", post);

app.use((req, res, next) => {
  const error = new Error("not found");
  error.status = 404;
  next(error);
});

app.listen(3000, () => {
  console.log("Running in port 3000");
});
