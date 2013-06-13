# An event xml/html scrapper

# Install
```bash
$ npm install page-reflex
```

# Use
```javascript
var reflex = new PageReflex('https://npmjs.org');

reflex.on('#index p:contains(Total Packages)', function(updated_content){
  console.log('Now', updated_content);
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
