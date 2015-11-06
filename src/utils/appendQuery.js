'use strict';

let url = require('url');
let _ = require('lodash');

module.exports = function appendQuery(urlIn, query) {
  let urlParsed = url.parse(urlIn, true);
  urlParsed.query = _.assign(urlParsed.query || {}, query);
  delete urlParsed.search;
  return url.format(urlParsed);
};
