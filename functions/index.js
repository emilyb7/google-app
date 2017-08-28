// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require("firebase-functions");

// Take the text parameter passed to this HTTP endpoint and insert it into the
// Return it in the user's browser
exports.displayText = functions.https.onRequest((req, res) => {
  res.send(req.query.text);
});

exports.postcode = functions.https.onRequest((req, res) => {
  if (!req.query || !req.query.postcode)
    return res.status(404).send("postcode not found");

  const postcode = req.query.postcode.toLowerCase().split(" ").join("");

  require("./get_postcode_details.js")(postcode, (err, postcodeDetails) => {
    if (err) return res.status(500).send("error");

    // if no results found by API
    if (postcodeDetails.status !== 200) return res.send(postcodeDetails.error);

    res.send(postcodeDetails.result.parliamentary_constituency);
  });
});
