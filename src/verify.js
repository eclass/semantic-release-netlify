"use strict";

const getError = require("./get-error");

module.exports = (_, { cwd }) => {
  if (!process.env.NETLIFY_AUTH_TOKEN) {
    throw getError("ENONETLIFYTOKEN");
  }
  if (!process.env.NETLIFY_SITE_ID) {
    throw getError("ENONETLIFYSITEID");
  }
};
