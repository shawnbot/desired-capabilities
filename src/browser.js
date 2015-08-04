const ALIASES = {
  'ie': 'internet explorer',
  'ff': 'firefox'
};

module.exports = function getBrowser(name) {
  name = String(name).toLowerCase();
  return ALIASES[name] || name;
};
