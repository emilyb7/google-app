// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require("firebase-functions");

// Take the text parameter passed to this HTTP endpoint and insert it into the
// Return it in the user's browser
exports.displayText = functions.https.onRequest((req, res) =>
  res.send(req.query.text)
);
