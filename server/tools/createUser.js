const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '../../.env' });

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

// Define user schema (simplified version)
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  isAdmin: Boolean,
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// Create admin user
async function createAdminUser() {
  try {
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('1234', salt);
    
    // Check if user already exists
    const existingUser = await User.findOne({ email: 'admin@example.com' });
    
    if (existingUser) {
      // Update password if user exists
      existingUser.password = hashedPassword;
      await existingUser.save();
      console.log('Admin user updated with new password');
    } else {
      // Create new user
      await User.create({
        username: 'admin',
        email: 'admin@example.com',
        password: hashedPassword,
        isAdmin: true
      });
      console.log('Admin user created successfully');
    }
    
    console.log('Login with:');
    console.log('Email: admin@example.com');
    console.log('Password: 1234');
    
    mongoose.disconnect();
  } catch (error) {
    console.error('Error creating admin user:', error);
    mongoose.disconnect();
  }
}

createAdminUser();