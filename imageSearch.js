function foo() {
  //const GoogleImages = require('./node_modules/google-images');
  require(["./"], function(foo) {
    const GoogleImages = foo;
    const client = new Client('013523532837040222294:c6ymvz91bo8', 'AIzaSyAeGqIJAEO5fK7HAqqvO2HiSXnLDAnjgDs');
    //return client.search(criteria, {
    //  size: 'large'
    //})[0].url;
  });

}
