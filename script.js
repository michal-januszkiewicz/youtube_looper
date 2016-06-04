$(document).ready(function() {
  $(".search").click(function() {
    $(".error").hide();
    var userLink = $(".video-link").val();
    var link = prepareLink(userLink);
    if (link === false) {
      $(".error").show();
      $(".video").hide();
    }
    else {
      $(".video").attr("src", link).show();
    }
  });
});

function prepareLink(userLink) {
    var coreLink = "https://www.youtube.com/embed/"
    var params = "?autohide=1&iv_load_policy=3&loop=1&rel=0&playlist=";
    var link = "";
    var videoID = getVideoID(userLink);

    result = checkLink(videoID);
    if (result === false) {
      return false;
    }

    link = coreLink.concat(videoID);
    link = link.concat(params, videoID);
    return link;
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
  link = "https://www.googleapis.com/youtube/v3/videos?part=id";
  apiKey = "AIzaSyB_8h_wB5FfhMaEh3MqZraRawrwgk1DTgc"
  params = "&id=".concat(videoID, "&key=", apiKey);
  link = link.concat(params);
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
