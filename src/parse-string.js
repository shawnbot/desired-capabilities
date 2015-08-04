var getBrowser = require('./browser');

const ANY = 'any';

module.exports = function parseString(browser) {
  var version = ANY;
  var platform = ANY;
  var colon = browser.indexOf(':');
  if (colon > -1) {
    platform = browser.substr(colon + 1);
    browser = browser.substr(0, colon);
  }
  var at = browser.indexOf('@');
  if (at > -1) {
    version = browser.substr(at + 1);
    browser = browser.substr(0, at);
  }
  return {
    browserName: getBrowser(browser),
    browserVersion: version,
    platform: platform
  };
};
