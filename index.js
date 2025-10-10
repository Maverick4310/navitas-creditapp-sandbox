// index.js
const express = require('express');
const cors = require('cors');
const { port, mode } = require('./config/env');
const { forwardToSalesforce } = require('./src/services/salesforceProxy');

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' })); // support JSON up to 10MB

// Health check route
app.get('/ping', (req, res) => {
  res.json({ status: 'ok', mode });
});

// Main credit app route
app.post('/creditapp', async (req, res) => {
  console.log(`📨 Incoming request to /creditapp in ${mode} mode`);
  const result = await forwardToSalesforce(req.body);

  if (result.success) {
    console.log(`✅ Salesforce responded with ${result.status}`);
    res.status(result.status).json(result.data);
  } else {
    console.error(`❌ Proxy error: ${result.status}`);
    res.status(result.status).json({
      message: 'Error forwarding to Salesforce',
      details: result.error,
    });
  }
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Navitas CreditApp Proxy (${mode}) running on port ${port}`);
});
