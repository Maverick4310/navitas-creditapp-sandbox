/**
 * index.js
 * --------------------------------------------------------
 * Entry point for Navitas Credit App Proxy (Sandbox)
 * --------------------------------------------------------
 */

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { forwardToSalesforce } = require('./src/services/salesforceProxy');

const app = express();

// === Middleware ===
app.use(cors()); // allow cross-origin requests
app.use(bodyParser.json({ limit: '5mb' })); // handle JSON payloads

// === Health check endpoint ===
app.get('/ping', (req, res) => {
  res.status(200).send(`Proxy is up and running in ${process.env.MODE || 'unknown'} mode`);
});

// === Credit App Forwarder ===
app.post('/creditapp', forwardToSalesforce);

// === Start the server ===
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Navitas Credit App Proxy (${process.env.MODE}) running on port ${PORT}`);
});
