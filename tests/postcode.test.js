const test = require("tape");
const getPostcode = require("../functions/get_postcode_details.js");

test("postcode test", t => {
  const postcode = "br76td";
  getPostcode(postcode, (err, body) => {
    t.ok(err === null, "no error returned");
    t.ok(body.status === 200, "returns a status of 200");
  });
  t.end();
});
