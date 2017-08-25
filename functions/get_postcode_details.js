const request = require("request");

const url = "http://postcodes.io/postcodes/";

module.exports = (postcode, cb) => {
  const getUrl = url + postcode;
  request(getUrl, (err, res, body) => {
    if (err) return cb(err);
    else cb(null, JSON.parse(body));
  });
};
