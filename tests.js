var util = require('util'),
  PageReflex = require('./index.js'),
  assert = require('assert'),
  http = require('http');

// create a stupid server
var server = http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end( '<body>' + Math.random() + '</body>');
}).listen(9615);

var reflex = new PageReflex('http://lesfront:tR3M9X@www2.pch.etat.lu/citaRS/seam/resource/rest/cita/tempsParcours/actuel', {
  every: 5000
});


reflex.on('collection tempsParcours:contains(Gasperich vers Fr. France)', function(new_body, $, cheerio_element){
  console.log('my new body is', new_body);
});
