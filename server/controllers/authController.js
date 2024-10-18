import { hash, compare } from "bcrypt";
import { sign, verify } from "jsonwebtoken";
import { initializeConnection } from "../config/database";

// Load environment variables
require('dotenv').config();

const secretKey = process.env.SECRET_KEY;
const refreshSecretKey = process.env.REFRESH_SECRET_KEY;

export async function register(req, res) {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await hash(password, 10);

    const connection = await initializeConnection();
    const sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    await connection.query(sql, [username, email, hashedPassword]);

    res.status(201).send("User registered successfully");
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).send("Error registering user");
  }
}

export async function login(req, res) {
  try {
    const { username, password } = req.body;
    const connection = await initializeConnection();
    const sql = "SELECT * FROM users WHERE username = ?";
    const [results] = await connection.query(sql, [username]);

    if (results.length === 0) {
      return res.status(401).send("Invalid username or password");
    }

    const user = results[0];
    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).send("Invalid username or password");
    }

    const token = sign({ id: user.id, username: user.username }, secretKey, { expiresIn: "24h" });
    const refreshToken = sign({ id: user.id, username: user.username }, refreshSecretKey);

    // Store the refresh token in the database
    const updateTokenSql = "UPDATE users SET refresh_token = ? WHERE id = ?";
    await connection.query(updateTokenSql, [refreshToken, user.id]);

    res.json({ token, refreshToken });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("Error logging in");
  }
}

export async function refreshToken(req, res) {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(401).send("Refresh token is required");
  }

  try {
    const decoded = verify(refreshToken, refreshSecretKey);
    const connection = await initializeConnection();
    const sql = "SELECT * FROM users WHERE id = ? AND refresh_token = ?";
    const [results] = await connection.query(sql, [decoded.id, refreshToken]);

    if (results.length === 0) {
      return res.status(403).send("Invalid refresh token");
    }

    const user = results[0];
    const newToken = sign({ id: user.id, username: user.username }, secretKey, { expiresIn: "24h" });

    res.json({ token: newToken });
  } catch (error) {
    console.error("Error during token refresh:", error);
    res.status(403).send("Invalid refresh token");
  }
}

const _protected = (req, res) => {
  const { username } = req.user;
  res.send(`Welcome ${username}! This is a protected route.`);
};
export { _protected };