require("dotenv/config")
const express = require("express");

const { loggerMiddleware } = require("./middleware/logger");

const bookRouter = require("./routes/book.routes");

const app = express();
const PORT = 8000;

app.use(express.json());

app.use(loggerMiddleware);

app.use("/books", bookRouter);

app.listen(PORT, () => {
  console.log(`HTTP server running on PORT ${PORT}`);
});
