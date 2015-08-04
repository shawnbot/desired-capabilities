# desired-capabilities

Tools for generating Selenium browser specs from shorthand strings and objects.

## Installation

```
npm install desired-capabilities
```

## Usage

```js
var caps = require('desired-capabilities');

var ie8 = caps.parse('ie@8');
console.dir(ie8);
/*
{
  browserName: 'internet explorer',
  browserVersion: '8',
  platform: 'any'
}
*/

var browsers = caps.parse('chrome@38..40:windows');
console.dir(browsers);
/*
[
  {
    browserName: 'chrome',
    browserVersion: 38,
    platform: 'windows'
  },
  {
    browserName: 'chrome',
    browserVersion: 39,
    platform: 'windows'
  },
  {
    browserName: 'chrome',
    browserVersion: 40,
    platform: 'windows'
  }
]
*/
```
