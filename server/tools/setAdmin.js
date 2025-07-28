const mongoose = require('mongoose');
const path = require('path');
// Fix the path to the .env file
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

// Add debugging to see if we're loading variables
console.log('MongoDB URI:', process.env.MONGO_URI);

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

// Define simplified user schema
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  isAdmin: Boolean,
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// Set user as admin by email or ID
async function setUserAsAdmin(identifier) {
  try {
    // Create query based on what was provided (email or ObjectId)
    const query = mongoose.Types.ObjectId.isValid(identifier) 
      ? { _id: identifier }
      : { email: identifier };
    
    // Find and update the user
    const user = await User.findOne(query);
    
    if (!user) {
      console.error('User not found');
      mongoose.disconnect();
      return;
    }
    
    // Set as admin and save
    user.isAdmin = true;
    await user.save();
    
    console.log(`User ${user.email} (${user._id}) is now an admin`);
    mongoose.disconnect();
  } catch (error) {
    console.error('Error updating user:', error);
    mongoose.disconnect();
  }
}



setUserAsAdmin('talktonaman@duck.com');