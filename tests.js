var util = require('util'),
  PageReflex = require('./index.js'),
  assert = require('assert'),
  http = require('http');

// create a stupid server
var reflex = new PageReflex('https://npmjs.org');

reflex.on('#index p:contains(Total Packages)', function(updated_content){
  console.log('Now', updated_content);
});
