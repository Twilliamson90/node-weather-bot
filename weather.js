"use strict";

const request = require("request");
const rp = require("request-promise");
const bugsnag = require("bugsnag");

bugsnag.register(`${process.env.BUGSNAG_KEY}`);

exports.handler = function(event, context, callback) {
  // const lat = event.queryStringParameters.lat;
  // const lng = event.queryStringParameters.lng;
  const lat = 42.701847;
  const lng = -84.482170;
  const units = "us";

  const callbackHeaders = {
    "Access-Control-Allow-Origin" : "*",
    "Access-Control-Allow-Headers": "Content-Type"
  };
  if (!lat) {
    callback(null, {
      statusCode: 400,
      headers: callbackHeaders,
      body: "Missing 'lat' parameter",
    });
  }
  if (!lng) {
    callback(null, {
      statusCode: 400,
      headers: callbackHeaders,
      body: "Missing 'lng' parameter",
    });
  }
  const apiUrlToCall = `https://api.darksky.net/forecast/${process.env.DARKSKY_KEY}/${lat},${lng}/?units=${units}`;
  const rpOptions = {
    uri: apiUrlToCall,
    headers: {
        "User-Agent": "Request-Promise"
    },
    json: true
  };
  rp(rpOptions)
  .then(body => {
    callback(null, {
      statusCode: 200,
      headers: callbackHeaders,
      body: JSON.stringify(body),
    });
  })
  .catch(err => {
    callback(bugsnag.notify(new Error(err)), {
      statusCode: 500,
      headers: callbackHeaders,
      body: JSON.stringify(err),
    });
  });
};