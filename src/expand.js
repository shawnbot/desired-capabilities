var extend = require('extend');
var getPlatform = require('./platform');

const COMMA = /\s*,\s*/g;
const DOTS = '..';
const ANY = 'any';

module.exports = function expandCapabilities(caps) {
  var versions = expandVersions(caps.browserVersion);
  var platforms = expandPlatforms(caps.platform);
  var variations = [];
  versions.forEach(function(version) {
    platforms.forEach(function(platform) {
      variations.push(extend({}, caps, {
        browserVersion: version,
        platform: platform
      }));
    });
  });
  return variations;
};

function expandVersions(versions) {
  if (!versions) return [ANY];
  return String(versions).split(COMMA).reduce(function(list, v) {
    if (v.indexOf(DOTS) > -1) {
      var versions = expandRange(v);
      return list.concat(versions);
    } else {
      list.push(v);
    }
    return list;
  }, []);
}

function expandPlatforms(platforms) {
  if (!platforms) return [ANY];
  return String(platforms).split(COMMA)
    .map(getPlatform);
}

function expandRange(str) {
  var bits = str.split(DOTS).map(Number);
  if (bits.some(isNaN)) {
    throw new Error('Expected numeric range, got: "' + range + '"');
  }
  var n = bits[0];
  var end = bits[1];
  var range = [n++];
  for (; n <= end; n++) {
    range.push(n);
  }
  return range;
}
