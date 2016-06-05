$(document).ready(function() {

  // User clicked 'Search' button.
  $(".search").click(function() {

    // Hide error message.
    $(".error").hide();

    // Get the link from the input.
    var userLink = $(".video-link").val();

    // Extract video id from the link.
    var videoID = getVideoID(userLink);

    // Check if link is valid and the video exists.
    result = checkLink(videoID);

    // If link is invalid.
    if (result === false) {
      // Show error message and hide the video.
      $(".error").show();
      $(".video").hide();
    }

    // If link is valid.
    else {
      // Create a loopable link.
      var coreLink = "https://www.youtube.com/embed/"
      var params = {
        autohide       : 1,
        iv_load_policy : 3,
        loop           : 1,
        rel            : 0,
        playlist       : videoID,
      }
      var link = prepareLink(coreLink, videoID, params);

      // And display it.
      $(".video").attr("src", link).show();
    }
  });
});


// Prepare a link with a video.
function prepareLink(coreLink, videoID, params) {
  var link = coreLink.concat(videoID);
  params = stringifyParams(params);
  link = link.concat(params);
  return link;
}


// Convert params dictionary to a string.
function stringifyParams(params) {
  var stringifiedParams = "?";
  for (var param in params) {
    stringifiedParams = stringifiedParams.concat(param, "=", params[param], "&");
  }
  // Chop off last '&' from the params.
  stringifiedParams = stringifiedParams.slice(0, -1);
  return stringifiedParams;
}

// Extract video id from the link.
function getVideoID(userLink) {
    // If user entered just the id do nothing.
    var videoID = userLink;
    var result = userLink.search("watch");    
    if (result > 0) {
      var index = result + "watch?v=".length;
      videoID = userLink.substring(index);
    }
    return videoID;
}

// Check if video id is valid and the video exists  
// using youtube API.
function checkLink(videoID) {
  var coreLink = "https://www.googleapis.com/youtube/v3/videos";
  var params = {
    part   : "id",
    id     : videoID,
    key    : "AIzaSyB_8h_wB5FfhMaEh3MqZraRawrwgk1DTgc",
  }
  params = stringifyParams(params);

  // Prepare a link for API.
  var link = coreLink.concat(params);

  // Check youtube API.
  var result = false;
  $.ajax({
    type: "GET",
    url: link,
    success: function(data, status) {
      result = data.items.length > 0;
    },
    async: false
  })
  .fail(function() {
    result = false;
  })
  return result;
}
