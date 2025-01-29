const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/user');


// Signup Controller
exports.signup = async (req, res) => {
    try {
      const { email, password, role } = req.body;
  
      // Check if email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'Email already in use'
        });
      }
  
      // Encrypt the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user
      const user = new User({
        email,
        password: hashedPassword,
        role 
      });
  
      await user.save();
  
      // Generate JWT Token
      const token = jwt.sign(
        { userId: user._id, role: user.role }, // Payload
        process.env.JWT_SECRET, // Secret key
        { expiresIn: '1h' } // Expiration time
      );
  
      res.status(201).json({
        success: true,
        message: 'User created successfully',
        token
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  };  

// Login Controller
exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if user exists
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({
          success: false,
          message: 'Invalid credentials'
        });
      }
  
      // Check if password matches
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: 'Invalid Password'
        });
      }
  
      // Generate JWT Token
      const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
  
      res.status(200).json({
        success: true,
        message: 'Login successful',
        token
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  };