/**
 * salesforceProxy.js
 * --------------------------------------------------------
 * Purpose:
 *   - Receives JSON payloads from partners
 *   - Forwards them to Salesforce via POST
 *   - Returns Salesforce's exact response
 * 
 * Environment Variables (from Render):
 *   - TARGET_SF_URL = Salesforce REST endpoint
 *   - MODE = 'sandbox' or 'production'
 * --------------------------------------------------------
 */

const axios = require('axios');

// === Forward partner request to Salesforce ===
async function forwardToSalesforce(req, res) {
  const targetUrl = process.env.TARGET_SF_URL;

  if (!targetUrl) {
    return res.status(500).json({ error: 'Missing TARGET_SF_URL environment variable.' });
  }

  try {
    const startTime = Date.now();

    // Forward the incoming payload to Salesforce
    const sfResponse = await axios.post(targetUrl, req.body, {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 25000 // 25 seconds max wait
    });

    const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(`[${new Date().toISOString()}] [${process.env.MODE}] Forwarded to SF (${elapsed}s) → Status ${sfResponse.status}`);

    // Return Salesforce's response as-is
    res.status(sfResponse.status).send(sfResponse.data);

  } catch (error) {
    console.error(`[ERROR ${new Date().toISOString()}] Salesforce proxy failed:`, error.message);

    if (error.response) {
      // Salesforce returned an error (like 400, 401, etc.)
      return res.status(error.response.status).json({
        message: 'Salesforce responded with an error',
        status: error.response.status,
        data: error.response.data
      });
    } else if (error.request) {
      // No response received
      return res.status(504).json({ message: 'No response from Salesforce endpoint (timeout or network issue).' });
    } else {
      // Other error
      return res.status(500).json({ message: 'Internal proxy error.', detail: error.message });
    }
  }
}

module.exports = { forwardToSalesforce };
