const fs = require("fs");
const test = require("tape");
const request = require("request");

const PROJECT = JSON.parse(fs.readFileSync(".firebaserc")).projects.default;
const REGION = "us-central1";
const URL = `https://${REGION}-${PROJECT}.cloudfunctions.net/postcode`;

test("postcode function test with valid postcode", t => {
  const query = "?postcode=br  76td";
  const expected = "Bromley and Chislehurst";
  request(URL + query, (err, res, body) => {
    t.equal(body, expected, "Expected result for query");
    t.end();
  });
});

test("postcode function test with invalid postcode", t => {
  const query = "?postcode=b  r  7";
  const expected = "Postcode not found";
  request(URL + query, (err, res, body) => {
    t.equal(body, expected, "Correct error message sent");
    t.end();
  });
});
