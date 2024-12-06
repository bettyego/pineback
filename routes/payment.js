const express = require('express');
const router = express.Router();

router.get('/getPaymentMethods', (req, res) => {
  res.json({
    methods: [
      {
        name: 'Bitcoin (BTC)',
        icon: '₿',
        description: 'Send BTC to the address below.',
        address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
        copyable: true,
      },
      {
        name: 'PayPal',
        icon: '💳',
        description: 'Send your funds via PayPal to our verified account.',
        address: 'payments@yourwebsite.com',
        copyable: true,
      },
      {
        name: 'Bank Transfer',
        icon: '🏦',
        description: 'Transfer directly to our bank account.',
        address: 'Account No: 123456789, Bank: XYZ Bank',
        copyable: false,
      },
    ],
  });
});

module.exports = router;
