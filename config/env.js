// config/env.js
require('dotenv').config();

module.exports = {
  targetSalesforceUrl:
    process.env.TARGET_SF_URL ||
    'https://navitascredit--ifsnav19.sandbox.my.salesforce-sites.com/creditapp/services/apexrest/newcreditapp',
  mode: process.env.MODE || 'sandbox',
  port: process.env.PORT || 3000,
};
