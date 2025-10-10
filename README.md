# navitas-creditapp-sandbox

This service forwards partner Credit Application payloads to Salesforce.

## Endpoints
- `POST /creditapp` → Forwards payload to Salesforce
- `GET /ping` → Health check

## Environment Variables
| Key | Example Value |
|-----|----------------|
| TARGET_SF_URL | https://navitascredit--ifsnav19.sandbox.my.salesforce-sites.com/creditapp/services/apexrest/newcreditapp |
| MODE | sandbox |
| PORT | 3000 |

## Run locally
```bash
npm install
npm start
