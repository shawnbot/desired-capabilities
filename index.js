var parse = require('./src/parse-string');
var expand = require('./src/expand');

module.exports = {
  parse: parse,
  getAll: getAll,
  getOne: getOne
};

function getAll(caps) {
  if (typeof caps === 'string') {
    caps = parse(caps);
  }
  return expand(caps);
}

function getOne(caps) {
  caps = getAll(caps);
  if (caps.length > 1) {
    throw new Error('Got ' + caps.length + ' variations from: ' + JSON.stringify(caps));
  }
  return caps[0];
}
