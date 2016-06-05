$(document).ready(function() {
  $(".search").click(function() {
    $(".error").hide();
    var userLink = $(".video-link").val();
    var videoID = getVideoID(userLink);
    result = checkLink(videoID);
    if (result === false) {
      $(".error").show();
      $(".video").hide();
    }
    else {
      var coreLink = "https://www.youtube.com/embed/"
      var params = {
        autohide       : 1,
        iv_load_policy : 3,
        loop           : 1,
        rel            : 0,
        playlist       : videoID,
      }
      var link = prepareLink(coreLink, videoID, params);
      $(".video").attr("src", link).show();
    }
  });
});

function prepareLink(coreLink, videoID, params) {
  var link = coreLink.concat(videoID);
  params = stringifyParams(params);
  link = link.concat(params);
  return link;
}

function stringifyParams(params) {
  var stringifiedParams = "?";
  for (var param in params) {
    stringifiedParams = stringifiedParams.concat(param, "=", params[param], "&");
  }
  // Chop off last '&' from the params.
  stringifiedParams = stringifiedParams.slice(0, -1);
  return stringifiedParams;
}

function getVideoID(userLink) {
    var videoID = userLink;
    var result = userLink.search("watch");    
    if (result > 0) {
      var index = result + "watch?v=".length;
      videoID = userLink.substring(index);
    }
    return videoID;
}

function checkLink(videoID) {
  var coreLink = "https://www.googleapis.com/youtube/v3/videos";
  var params = {
    part   : "id",
    id     : videoID,
    key    : "AIzaSyB_8h_wB5FfhMaEh3MqZraRawrwgk1DTgc",
  }
  params = stringifyParams(params);

  var link = coreLink.concat(params);
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
