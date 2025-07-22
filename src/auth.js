const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

const users = [];
const refreshTokens = [];
const revokedAccessTokens = [];

const ACCESS_SECRET = "access_secret_key";
const REFRESH_SECRET = "refresh_secret_key";
const ACCESS_TIME = "5m";
const REFRESH_TIME = "15m";

// Generate access token valid for 15 minutes
function generateAccessToken(user) {
  return jwt.sign({ userId: user.id, email: user.email }, ACCESS_SECRET, {
    expiresIn: ACCESS_TIME,
  });
}

// 🔐 LOGIN or AUTO-SIGNUP
router.post("/login", async (req, res) => {
  const { email, password, name } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }
  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }
  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Email is not valid" });
  }

  let user = users.find((u) => u.email === email);

  if (!user) {
    const hashedPassword = await bcrypt.hash(password, 10);
    user = {
      id: users.length + 1,
      name,
      email,
      password: hashedPassword,
    };
    users.push(user);
    console.log(`Created new user: ${email}`);
  } else {
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
  }
  const accessToken = generateAccessToken(user);
  const refreshToken = jwt.sign({ userId: user.id }, REFRESH_SECRET, {
    expiresIn: REFRESH_TIME,
  });

  refreshTokens.push(refreshToken);

  res.json({ accessToken, refreshToken });
});

router.post("/refresh", (req, res) => {
  const { token } = req.body;

  if (!token) {
    console.log("No token provided");
    return res.sendStatus(401);
  }

  if (!refreshTokens.includes(token)) {
    return res.sendStatus(403);
  }

  jwt.verify(token, REFRESH_SECRET, (err, payload) => {
    if (err) {
      return res.sendStatus(403);
    }

    const user = users.find((u) => u.id === payload.userId);
    if (!user) {
      return res.sendStatus(403);
    }

    const accessToken = generateAccessToken(user);
    res.json({ accessToken });
  });
});

router.post("/logout", authenticateToken, (req, res) => {
  const userId = req.user.userId;
  const token = req.headers["authorization"]?.split(" ")[1];

  for (let i = refreshTokens.length - 1; i >= 0; i--) {
    try {
      const payload = jwt.verify(refreshTokens[i], REFRESH_SECRET);
      if (payload.userId === userId) {
        refreshTokens.splice(i, 1);
      }
    } catch (err) {
      refreshTokens.splice(i, 1);
    }
  }

  if (token) {
    revokedAccessTokens.push(token);
  }

  res.json({
    message: "Logged out successfully, all sessions cleared for user.",
  });
});

router.get("/profile", authenticateToken, (req, res) => {
  const user = users.find((u) => u.id === req.user.userId);
  if (!user) return res.sendStatus(404);
  res.json({ id: user.id, name: user.name, email: user.email });
});

// Middleware to authenticate access tokens
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  if (!token) return res.sendStatus(401);
  if (revokedAccessTokens.includes(token)) return res.sendStatus(403);

  jwt.verify(token, ACCESS_SECRET, (err, payload) => {
    if (err) return res.sendStatus(403);
    req.user = payload;
    next();
  });
}

module.exports = {
  authRouter: router,
  authenticateToken,
};
