const express = require('express');
const router = express.Router();
const User = require('../models/User')

router.post('/webhook', async (req, res) => {
    const { address, amount, timestamp } = req.body;
  
    // Find the user with the BTC address
    const user = Object.values(User).find((user) => user.btcAddress === address);
    if (user) {
      // Record the deposit
      user.depositHistory.push({ amount, timestamp });
  
      // Update user balance (implement this in your database logic)
      console.log(`Deposit of ${amount} BTC received for user.`);
    }
  
    res.status(200).send('OK');
  });
  