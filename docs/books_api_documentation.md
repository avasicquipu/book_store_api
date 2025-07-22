# 📚 Books API Documentation

---

## Base URL

- `/books`

---

## Endpoints

### 1. GET `/books`

**Retrieve all books with pagination**

- Query parameters:
  - `page` (optional, default: 1) — page number
  - `limit` (optional, default: 10) — number of books per page

**Response body:**

```json
{
  "page": 1,
  "limit": 10,
  "totalItems": 100,
  "totalPages": 10,
  "items": [
    {
      "id": 1,
      "title": "Book Title",
      "author": "Author Name",
      "description": "Book description",
      "price": 10.99,
      "image_url": "http://example.com/image.jpg"
    },
    "... more books ..."
  ]
}
```

---

### 2. GET `/books/search`

**Search books by title or author with pagination**

- Query parameters:
  - `search` (optional) — search keyword for title or author
  - `page` (optional, default: 1)
  - `limit` (optional, default: 10)

**Response body:**

Same format as GET `/books`.

---

### 3. GET `/books/:id`

**Get one book by ID**

- Path parameter:
  - `id` (required) — book ID

**Response body:**

```json
{
  "id": 1,
  "title": "Book Title",
  "author": "Author Name",
  "description": "Book description",
  "price": 10.99,
  "image_url": "http://example.com/image.jpg"
}
```

**Errors:**

- `404 Not Found` if book not found.

---

### 4. POST `/books`

**Create a new book** (Protected route)

- Request body (JSON):

```json
{
  "title": "New Book Title",
  "author": "Author Name",
  "description": "Optional description",
  "price": 15.99,
  "image_url": "http://example.com/image.jpg"
}
```

- `title` and `author` are required.
- Returns the created book with its `id`.

**Errors:**

- `400 Bad Request` if `title` or `author` are missing.
- `409 Conflict` if book with the same title and author already exists.

---

### 5. PUT `/books/:id`

**Update a book by ID** (Protected route)

- Path parameter:

  - `id` (required) — book ID

- Request body (any of the fields to update):

```json
{
  "title": "Updated Title",
  "author": "Updated Author",
  "description": "Updated description",
  "price": 12.99,
  "image_url": "http://example.com/updated-image.jpg"
}
```

- Returns the updated book.

**Errors:**

- `404 Not Found` if book not found.

---

### 6. DELETE `/books/:id`

**Delete a book by ID** (Protected route)

```
Authorization: Bearer <jwt_access_token>
```

- Path parameter:

  - `id` (required) — book ID

- Returns deleted book and confirmation message.

**Errors:**

- `404 Not Found` if book not found.

---
