var imageSearch = require('node-google-image-search');

var results = imageSearch('<search-term>', callback, 0, 5);

function callback(results) {
  //_do something with results_;
}
