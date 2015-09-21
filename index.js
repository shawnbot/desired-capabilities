var parse = require('./src/parse-string');
var expand = require('./src/expand');

function desiredCapabilities(src) {
  if (typeof src === 'string') {
    return expand(parse(src));
  } else if (Array.isArray(src)) {
    return src.reduce(function(list, d) {
      return list.concat(desiredCapabilities(d));
    }, []);
  } else if (typeof src === 'object') {
    return expand(src);
  }
  throw new Error('Expected string, Array or object; got "' + (typeof src) + '"');
}

module.exports = desiredCapabilities;

module.exports.parse = parse;

module.exports.expand = expand;

module.exports.one = function getOne(src) {
  var caps = desiredCapabilities(src);
  if (caps.length > 1) {
    throw new Error('Got ' + caps.length + ' variations from: ' + JSON.stringify(src));
  }
  return caps[0];
};
