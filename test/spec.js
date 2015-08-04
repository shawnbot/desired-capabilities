var assert = require('assert');
var caps = require('../');

describe('parse() (single spec)', function() {

  it('parses "ie" as "internet explorer"', function() {
    assert.equal(
      caps.parse('ie').browserName,
      'internet explorer'
    );
  });

  it('parses versions in the form "name@version"', function() {
    var c = caps.parse('ie@8')
    assert.equal(c.browserName, 'internet explorer');
    assert.equal(c.browserVersion, 8);
    c = caps.parse('ie@8.0');
    assert.equal(c.browserName, 'internet explorer');
    assert.equal(c.browserVersion, '8.0');
  });

  it('parses platforms in the form "name:platform"', function() {
    var c = caps.parse('chrome:windows')
    assert.equal(c.browserName, 'chrome');
    assert.equal(c.platform, 'windows');
  });

  it('parses version and platform in the form "name@version:platform"', function() {
    var c = caps.parse('chrome@40:windows')
    assert.equal(c.browserName, 'chrome');
    assert.equal(c.browserVersion, 40);
    assert.equal(c.platform, 'windows');
  });

});

describe('getAll()', function() {

  it('parses single browser versions', function() {
    var c = caps.getAll('ie@8');
    assert.equal(c.length, 1);
    assert.deepEqual(
      c,
      [
        {
          browserName: 'internet explorer',
          browserVersion: '8',
          platform: 'any'
        }
      ]
    );
  });

  it('parses version ranges with ".."', function() {
    assert.deepEqual(
      caps.getAll('ie@8..9'),
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
    var c = caps.getAll('chrome@38..40:windows');
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

describe('getOne()', function() {

  it('returns a single capabilities spec', function() {
    assert.deepEqual(
      caps.getOne('ie@8:windows'),
      {
        browserName: 'internet explorer',
        browserVersion: '8',
        platform: 'windows'
      }
    );
  });

  it('throws an error when it gets more than one', function() {
    assert.throws(function() {
      caps.getOne('ie@8..9');
    });
  });

});
