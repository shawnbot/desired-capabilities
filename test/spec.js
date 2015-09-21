var assert = require('assert');
var caps = require('../');

describe('one()', function() {

  it('returns a single capabilities spec', function() {
    assert.deepEqual(
      caps.one('ie@8:windows'),
      {
        browserName: 'internet explorer',
        browserVersion: '8',
        platform: 'windows'
      }
    );
  });

  it('throws an error when it gets more than one', function() {
    assert.throws(function() {
      caps.one('ie@8..9');
    });
  });

});

describe('string parsing', function() {

  it('treats "ie" as "internet explorer"', function() {
    assert.equal(
      caps.one('ie').browserName,
      'internet explorer'
    );
  });

  it('recognizes versions in the form "name@version"', function() {
    var c = caps.one('ie@8')
    assert.equal(c.browserName, 'internet explorer');
    assert.equal(c.browserVersion, 8);
    c = caps.parse('ie@8.0');
    assert.equal(c.browserName, 'internet explorer');
    assert.equal(c.browserVersion, '8.0');
  });

  it('recognizes platforms in the form "name:platform"', function() {
    var c = caps.one('chrome:windows')
    assert.equal(c.browserName, 'chrome');
    assert.equal(c.platform, 'windows');
  });

  it('recognizes version and platform in the form "name@version:platform"', function() {
    var c = caps.one('chrome@40:windows')
    assert.equal(c.browserName, 'chrome');
    assert.equal(c.browserVersion, 40);
    assert.equal(c.platform, 'windows');
  });

});

describe('version ranges', function() {

  it('parses version ranges with ".."', function() {
    assert.deepEqual(
      caps('ie@8..9'),
      [8, 9].map(function(version) {
        return {
          browserName: 'internet explorer',
          browserVersion: version,
          platform: 'any'
        };
      })
    );
  });

  it('parses version ranges with platform: "name@a..b:platform"', function() {
    var c = caps('chrome@38..40:windows');
    assert.equal(c.length, 3);
    assert.deepEqual(
      c,
      [38, 39, 40].map(function(version) {
        return {
          browserName: 'chrome',
          browserVersion: version,
          platform: 'windows'
        };
      })
    );
  });

});
