# An event xml/html scrapper

# Install
```bash
$ npm install page-reflex
```

# Use
```javascript
var reflex = new PageReflex('http://fr.yahoo.com', {
  every: 5000
});

reflex.on('.markets.clearfix.strong.small', function(new_stocks){
  console.log('new markets numbers', new_stocks);
});
```

# Run Grunt (jslint, docs)
```bash
$ grunt
```

# Documentation
API documentation is built by ```grunt``` and stored in the ```public/docs``` directory

# License
BSD

# Contribute
All comments, patchs and pull requests are welcome, but please ensure you ran ```grunt``` without warnings before creating a pull request.
