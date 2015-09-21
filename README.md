# desired-capabilities

Tools for generating Selenium browser specs from shorthand strings and objects.

## Installation

```
npm install desired-capabilities
```

## Usage

### `capabilities(str)` or `capabilities.parse(str)`
Parses the a string in the form:

```
browser(@versions)?(:platforms)?
```

where:

* `versions` can either be a single version or an inclusive numeric range in
  the form `start..end`.
* `platforms` can be one or more comma-separated platform names or
  shorthands, such as `xp` or `win7`.

###### Examples

```js
var caps = require('desired-capabilities');
var assert = require('assert');

assert.deepEqual(caps.parse('ie@8:xp'), {
  browserName: 'internet explorer',
  browserVersion: '8',
  platform: 'Windows XP'
});
```

Consult the [Sauce Labs](https://docs.saucelabs.com/reference/platforms-configurator/)
or [BrowserStack](https://www.browserstack.com/list-of-browsers-and-platforms?product=live)
docs for a list of available browsers and platforms.


### `capabilities(obj)` or `capabilities.expand(object)`
Returns an *array of variations* of the provided capabilities object
for each of the `browserVersion` and `platform` values, using the
same logic as [the string parser](#parse).

###### Examples

```js
var caps = require('desired-capabilities');
var assert = require('assert');

assert.deepEqual(caps({
  browserName: 'Chrome',
  browserVersion: '8..9'
}), [
  {
    browserName: 'Chrome',
    browserVersion: 8,
    platform: 'any'
  },
  {
    browserName: 'Chrome',
    browserVersion: 9,
    platform: 'any'
  }
]);
```


### `capabilities(array)`
Expands or parses all of the values in the array to produce one big list of
capabilities. The values in the array may be either strings, objects, or nested
arrays.

###### Examples

```js
var caps = require('desired-capabilities');
var assert = require('assert');

assert.deepEqual(
  caps(['phantomjs', 'ie@8..9', 'chrome@40', {
      browserName: 'ff',
      browserVersion: 36
  }]),
  [
    {
      browserName: 'phantomjs',
      browserVersion: 'any',
      platform: 'any'
    },
    {
      browserName: 'internet explorer',
      browserVersion: 8,
      platform: 'any'
    },
    {
      browserName: 'internet explorer',
      browserVersion: 9,
      platform: 'any'
    },
    {
      browserName: 'chrome',
      browserVersion: '40',
      platform: 'any'
    },
    {
      browserName: 'firefox',
      browserVersion: '36'
      platform: 'any'
    },
  ]
);
```
