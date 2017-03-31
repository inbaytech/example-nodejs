# NodeJS / Express demo of idQ Authentication

This repository demonstrates how to integrate idQ authentication into your Node.JS / Express web application.

## Prerequisites
1. You need to have an idQ Developer account
2. Login to your Account Portal and issue OAuth2 credentials for the demo app See https://docs.idquanta.com for instructions on issuing OAuth2 credentials.
3. Specify `http://localhost:8123/oauthcallback` as the Callback URL when creating your OAuth2 credentials.

## Usage
1. Clone this repository
2. Configure your OAuth2 credentials in `idq-client.js`
```javascript
// OAuth 2.0 Client Configuration
var client_id = 'YOUR_CLIENT_ID';
var client_secret = 'YOUR_CLIENT_SECRET';
```
3. Install dependencies `npm install`
4. Start the app `npm start`
5. Open http://localhost:8123 in your browser and click "Login with idQ"
