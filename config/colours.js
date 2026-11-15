// One list of the six ribbon colours. The iPad, the screen, and the server
// all read this file so a colour key always means the same thing.
// Words and hex values come from the mouse prototype. Melody ids are
// placeholders until the design team replaces them.

const COLOURS = [
  { key: 'red',    hex: '#ff6b5e', de: 'Wärme',       en: 'Warmth',  melody: 'melody-red' },
  { key: 'yellow', hex: '#ffd45e', de: 'Licht',       en: 'Light',   melody: 'melody-yellow' },
  { key: 'blue',   hex: '#5e9bff', de: 'Ruhe',        en: 'Calm',    melody: 'melody-blue' },
  { key: 'green',  hex: '#5ee08f', de: 'Wachsen',     en: 'Growth',  melody: 'melody-green' },
  { key: 'purple', hex: '#b17bff', de: 'Erinnerung',  en: 'Memory',  melody: 'melody-purple' },
  { key: 'orange', hex: '#ff9a4d', de: 'Gesellschaft', en: 'Company', melody: 'melody-orange' },
];

// CommonJS so server.js can require() this file. The browser pages will
// load the same file later with a small script tag.
module.exports = { COLOURS };
