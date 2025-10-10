// src/services/salesforceProxy.js
const axios = require('axios');
const { targetSalesforceUrl } = require('../../config/env');

async function forwardToSalesforce(reqBody) {
  try {
    const response = await axios.post(targetSalesforceUrl, reqBody, {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 30000, // 30 seconds timeout
    });

    return {
      success: true,
      status: response.status,
      data: response.data,
    };
  } catch (error) {
    console.error('❌ Error forwarding request to Salesforce:', error.message);

    return {
      success: false,
      status: error.response ? error.response.status : 500,
      error: error.response ? error.response.data : error.message,
    };
  }
}

module.exports = { forwardToSalesforce };
