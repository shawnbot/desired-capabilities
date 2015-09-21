const ALIASES = {
  // Sauce Labs
  'winxp':  'Windows XP',
  'xp':     'Windows XP',
  'win7':   'Windows 7',
  'win8':   'Windows 8',
  'win19':  'Windows 10',
  // TODO: add OS X shorthands
};

module.exports = function getPlatform(name) {
  return ALIASES[name.toLowerCase()] || name;
};
