const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create user
    const user = await User.create({
      username,
      email,
      password
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id)
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login attempt:", email);

    // Find user by email
    const user = await User.findOne({ email });
    console.log("User found:", user ? user._id : "none");
    
    if (!user) {
      console.log("No user found with this email");
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    // Debug password comparison
    try {
      const isMatch = await bcrypt.compare(password, user.password);
      console.log("Password comparison result:", isMatch);
      console.log("Entered password:", password);
      console.log("Stored password hash:", user.password);
      
      if (isMatch) {
        console.log("Password matched, generating token...");
        const token = generateToken(user._id);
        return res.json({
          _id: user._id,
          username: user.username,
          email: user.email,
          isAdmin: user.isAdmin,
          token
        });
      } else {
        console.log("Password did not match");
        return res.status(401).json({ message: 'Invalid email or password' });
      }
    } catch (err) {
      console.error("Error in password comparison:", err);
      return res.status(500).json({ message: 'Server error during authentication' });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { register, login, getProfile };