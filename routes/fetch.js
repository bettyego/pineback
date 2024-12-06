const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');

// Mock database
const users = {}; // Replace with your actual database logic

// Fetch or generate a BTC address
router.get('/getBTCAddress', async (req, res) => {
  const userId = req.user.id; // Ensure authentication middleware provides user ID
  try {
    // If user already has a BTC address, return it
    if (users[userId]?.btcAddress) {
      return res.json({
        btcAddress: users[userId].btcAddress,
        history: users[userId].depositHistory || [],
      });
    }

    // Generate a new BTC address using a crypto payment gateway or service
    const apiResponse = await axios.post('https://api.blockonomics.co/api/address', {
      label: uuidv4(), // Unique identifier for the user
    });

    const btcAddress = apiResponse.data.address;

    // Save to database
    users[userId] = {
      btcAddress,
      depositHistory: [],
    };

    res.json({ btcAddress, history: [] });
  } catch (error) {
    console.error('Error generating BTC address:', error);
    res.status(500).json({ error: 'Failed to generate BTC address' });
  }
});

module.exports = router;
