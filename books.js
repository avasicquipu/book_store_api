const express = require("express");
const router = express.Router();
const { books } = require("./data");
const { authenticateToken } = require("./auth");

// 📚 GET all books (no auth needed or can add auth if you want)
router.get("/", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const paginatedBooks = books.slice(startIndex, endIndex);

  const totalItems = books.length;
  const totalPages = Math.ceil(totalItems / limit);

  res.json({
    page,
    limit,
    totalItems,
    totalPages,
    items: paginatedBooks,
  });
});

router.get("/search", (req, res) => {
  const { search } = req.query;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  let filteredBooks = books;

  if (search) {
    const lowerSearch = search.toLowerCase();
    filteredBooks = books.filter(
      (b) =>
        b.title.toLowerCase().includes(lowerSearch) ||
        b.author.toLowerCase().includes(lowerSearch)
    );
  }

  const totalItems = filteredBooks.length;
  const totalPages = Math.ceil(totalItems / limit);

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const paginatedBooks = filteredBooks.slice(startIndex, endIndex);

  res.json({
    page,
    limit,
    totalItems,
    totalPages,
    items: paginatedBooks,
  });
});

// 📚 GET one book by id
router.get("/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = books.find((b) => b.id === bookId);
  if (!book) return res.status(404).json({ message: "Book not found" });
  res.json(book);
});

// ➕ CREATE book (protected route)
router.post("/", authenticateToken, (req, res) => {
  const { title, author, description, price, image_url } = req.body;

  if (!title || !author) {
    return res.status(400).json({ message: "Title and author are required" });
  }

  const existingBook = books.find(
    (b) =>
      b.title.toLowerCase() === title.toLowerCase() &&
      b.author.toLowerCase() === author.toLowerCase()
  );

  if (existingBook) {
    return res
      .status(409)
      .json({ message: "Book with this title and author already exists" });
  }

  const newBook = {
    id: books.length ? books[books.length - 1].id + 1 : 1,
    title,
    author,
    description: description || "",
    price: price || 0,
    image_url: image_url || "",
  };

  books.push(newBook);
  res.status(201).json(newBook);
});

// 🔄 UPDATE book (protected route)
router.put("/:id", authenticateToken, (req, res) => {
  const bookId = parseInt(req.params.id);
  const bookIndex = books.findIndex((b) => b.id === bookId);

  if (bookIndex === -1)
    return res.status(404).json({ message: "Book not found" });

  const { title, author, description, price, image_url } = req.body;

  if (title !== undefined) books[bookIndex].title = title;
  if (author !== undefined) books[bookIndex].author = author;
  if (description !== undefined) books[bookIndex].description = description;
  if (price !== undefined) books[bookIndex].price = price;
  if (image_url !== undefined) books[bookIndex].image_url = image_url;

  res.json(books[bookIndex]);
});

// ❌ DELETE book (protected route)
router.delete("/:id", authenticateToken, (req, res) => {
  const bookId = parseInt(req.params.id);
  const bookIndex = books.findIndex((b) => b.id === bookId);

  if (bookIndex === -1)
    return res.status(404).json({ message: "Book not found" });

  const deletedBook = books.splice(bookIndex, 1)[0];
  res.json({ message: "Book deleted", book: deletedBook });
});

module.exports = {
  booksRouter: router,
};
