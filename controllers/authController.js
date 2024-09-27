import bcrypt from 'bcryptjs';
import { generateToken } from '../config/auth.js';
import { User } from '../models/userModel.js';

export const register = async (req, res) => {
  const { username, password } = req.body;

  // Hash the password before storing it
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    User.create({ username, password: hashedPassword }, (err, result) => {
      if (err) {
        console.error('Registration error:', err);
        return res.status(500).json({ error: 'Registration failed' });
      }
      res.status(201).json({ message: 'User registered successfully' });
    });
  } catch (error) {
    console.error('Hashing error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  User.findOne({ username }, async (err, user) => {
      if (err) {
          console.error('Database query error:', err);
          return res.status(500).json({ error: 'Internal server error' });
      }

      // Log the retrieved user object
      // console.log('Found user:', user);

      if (!user) {
          return res.status(401).json({ error: 'Invalid credentials' });
      }

      try {
          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
              return res.status(401).json({ error: 'Invalid credentials' });
          }

          const token = generateToken(user.id);
          res.status(200).json({ token });
      } catch (error) {
          console.error('Password comparison error:', error);
          res.status(500).json({ error: 'Internal server error' });
      }
  });
};

