# 📚 Book Store API Documentation

---

## Base URLs

- **Auth:** `/auth`
- **Books:** `/books`

---

# 🔐 Authentication API

---

### 1. POST `/auth/login`

**Login or auto-register a user**

- All fields (`email`, `password`, `name`) are **required**.
- Validates email format and ensures all fields are non-empty.
- If user doesn’t exist, creates a new one.
- Returns JWT `accessToken` and `refreshToken`.
- `accessToken` expires in 5 minutes.
- `refreshToken` expires in 15 minutes.

**Request body:**

```json
{
  "email": "user@example.com",
  "password": "your_password",
  "name": "User Name"
}
```

**Response body:**

```json
{
  "accessToken": "<jwt_access_token>",
  "refreshToken": "<jwt_refresh_token>"
}
```

**Errors:**

```json
400 Bad Request — missing required fields (email, password, or name)
400 Bad Request — invalid email format
400 Bad Request — invalid credentials (wrong password)
```

---

### 2. POST `/auth/refresh`

**Obtain new access token using a valid refresh token**

- Provide a refresh token in the request body.
- Refresh token must be:
  - Present in server memory
  - Not expired
  - Properly signed and valid
- Returns a new access token if valid.

**Request body:**

```json
{
  "token": "<refresh_token>"
}
```

**Response body:**

```json
{
  "accessToken": "<new_jwt_access_token>"
}
```

**Errors:**

```json
401 Unauthorized — no token provided
403 Forbidden — invalid, expired or revoked token
```

---

### 3. POST `/auth/logout`

**Logout user and revoke refresh tokens**

- Requires a valid access token.
- Removes **all** refresh tokens for the authenticated user from memory.
- Logs out the user from all active sessions.

**Authorization header:**

```
Authorization: Bearer <jwt_access_token>
```

**Request body:**

```json
{}
```

**Response body:**

```json
{
  "message": "Logged out successfully, all sessions cleared for user."
}
```

**Errors:**

```json
401 Unauthorized — missing or invalid access token
403 Forbidden — token is invalid or expired
```

---

### 4. GET `/auth/profile`

**Get profile of the authenticated user**

- Requires a valid access token.
- Returns the logged-in user’s ID, name, and email.

**Authorization header:**

```
Authorization: Bearer <jwt_access_token>
```

**Response body:**

```json
{
  "id": 1,
  "name": "User Name",
  "email": "user@example.com"
}
```

**Errors:**

```json
401 Unauthorized — no token provided
403 Forbidden — invalid or expired token
404 Not Found — user not found
```

---
