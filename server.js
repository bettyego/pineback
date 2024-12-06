const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken'); 
dotenv.config();

const User = require('./models/User');
// Import routes
const authRoutes = require('./routes/auth');
const faqRoutes = require('./routes/faq');
const paymentRoutes = require('./routes/payment');
// const depositRoutes = require('./routes/deposite');


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/faq', faqRoutes);
app.use('/api/paymentRoutes', paymentRoutes);
// app.use('/api/depositRoutes', depositRoutes);

app.get('/getUsers', async (req,res)=>{
  try {
    const users = await User.find()
    return res.json({users, message: 'fetch successful', status:201})
  } catch (error) {
    console.log(error)
    return res.json({message: 'fetch failed', status:500})
  }
})

// Delete User Route
app.delete('/deleteUser/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    const result = await User.deleteOne({ _id: userId });
    if (result.deletedCount === 1) {
      res.status(200).json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.get('/getUserDetails', async (req, res) => {
  const token = req.headers["x-access-token"];
  
  try {
    const userToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = userToken.userId
    console.log(userId)
    const user = await User.findOne({_id:userId});
    if (user) {
      res.status(200).json({ user, message: 'User found', status: 200 });
    } else {
      res.status(404).json({ message: 'User not found', status: 404 });
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Internal Server Error', status: 500 });
  }
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error(err));

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
