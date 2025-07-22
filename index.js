const express = require("express");
const { authRouter } = require("./auth");
const { booksRouter } = require("./books");

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/ping", (req, res) => res.send("Book Store API is running 📚"));

app.use("/auth", authRouter);
app.use("/books", booksRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
