const express = require('express');

const router = express.Router();

const faqData = [
  {
    title: "How can I open an account with PineBridge?",
    content:
      "To open an account, visit our official website and navigate to the 'Get Started' section. Alternatively, you can contact our customer service team for guidance.",
  },
  {
    title: "What is PineBridge's approach to responsible investing?",
    content:
      "PineBridge integrates Environmental, Social, and Governance (ESG) factors into its investment processes, aiming to create sustainable long-term value for investors.",
  },
  {
    title: "How can I access my portfolio information?",
    content:
      "You can access your portfolio details by logging into the PineBridge client portal. If you haven’t registered yet, contact our support team for assistance.",
  },
];

router.get('/', (req, res) => {
  res.json(faqData);
});

module.exports = router;
