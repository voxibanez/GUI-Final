function searchImage(imageName, callback) {
  var def = $.Deferred();
  // Set the flicker api url here
  var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";

  // Set the tag display options
  var options = {
    tags: imageName,
    sort: "relevance",
    format: "json"
  };

  // Get json format data using $.getJSON()
  $.getJSON(flickerAPI, options)
    .done(callback)
    .fail(OnApiCallError);



  // Api call error callback function
  function OnApiCallError(jqxhr, textStatus, error) {
    var err = textStatus + ", " + error;
    console.log("Request Failed: " + err);
  }
  return def;
}
