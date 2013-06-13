var EventEmitter = require('events').EventEmitter;
var request = require('request');
var $ = require('cheerio');
var util = require('util');

/**
* Page reflexion class
* Use it with
* var client = new PageReflex(url)
*                                   .on('body #content', function(updated_content){
*                                       // do stuff with updated_content
*                                   })
*
* @param {String} url The URL to scrape for change
* @return object An instanciated PageReflex class
*/
var PageReflex = function(url, settings) {
  EventEmitter.call(this, settings);
  var self = this;

  if (!url) {
    throw 'You must provide an url';
  }

  this.url = url;
  this.currentRequest = null;

  this.settings = settings || {};
  this.settings.retry = this.settings.retry || false;
  this.settings.every = (this.settings.every || 30) * 1000;
  this.settings.rejectUnauthorized = this.settings.rejectUnauthorized || true;

  // our changes expressions
  this.paths = {};
  this.on('newListener', function(event, listener){
    self.paths[event] = self.paths[event] || {
      last_modified: null,
      data: ''
    };
  });

  this.timer = setInterval(function(){
    self.currentRequest = self.request();
  }, this.settings.every);
};
util.inherits(PageReflex, EventEmitter);

module.exports = PageReflex;

/**
* Main request wrapper
*
* @param {String} path The path to the api endpoint
* @param {Object} parameters A query string object
* @param {Function} callback The request callback(error, response_body)
* @return {Request} The request object
*/
PageReflex.prototype.request = function() {
  var self = this;
  var r = request({
    url: this.url,
    method: 'GET',
    rejectUnauthorized: this.settings.rejectUnauthorized,
  }, function(error, response, body){
    if (error && !response && self.settings.retry) {
      if (self.debug) {
        console.log('network error, retry', error);
      }
      return self.request();
    }
    self.extract(body);
  });
  return r;
};

/**
* Extract
*
* @param {String} body The body to be parsed for changes
*/
PageReflex.prototype.extract = function(body) {
  var parsedHTML = $.load(body);
  var self = this;
  var now = new Date();

  for (var selector in this.paths) {
    parsedHTML(selector).each(function(i, element) {
      var elementHtml = $(element).html();

      if (self.paths[selector].data !== elementHtml) {
        self.paths[selector].data = elementHtml;
        self.paths[selector].last_modified = now;
        self.emit(selector, elementHtml, $, element, body);

      } else {
        //console.log(selector, 'content['+i+'] did not changed');
      }
    });
  }
};

