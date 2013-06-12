var Jamendo = require('./index.js'),
    assert  = require('assert'),
    request = require('request');

// get an API client
var jamendo = new Jamendo({
  debug: true,
  retry: true,
  protocole: 'https',
  client_id: 'b6747d04' // b6747d04 is a testing client_id, replace by yours
});



