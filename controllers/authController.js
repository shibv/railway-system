import bcrypt from 'bcryptjs';
import { generateToken } from '../config/auth.js';
import {db} from '../config/db.js'

export const register = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the user into the database
    const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
    const [result] = await db.query(query, [username, hashedPassword]);
    console.log(result)
    // Check if the user was successfully created
    if (result.affectedRows > 0) {
      res.status(201).json({ message: 'User registered successfully' });
    } else {
      res.status(500).json({ error: 'Registration failed' });
    }
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find user by username
    const query = 'SELECT * FROM users WHERE username = ?';
    const [rows] = await db.query(query, [username]);

    const user = rows[0]; // Assuming you get a single user in the response

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Compare the entered password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token if credentials are valid
    const token = generateToken(user.id);

    // Return the token to the user
    res.status(200).json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
