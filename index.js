const express = require("express");
const { authRouter } = require("./src/auth");
const { booksRouter } = require("./src/books");

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/ping", (req, res) => res.send("Book Store API is running 📚"));

app.use("/auth", authRouter);
app.use("/books", booksRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
