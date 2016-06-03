$(document).ready(function() {
  $(".search").click(function() {
    $(".error").hide();
    var userLink = $(".video-link").val();
    var link = prepareLink(userLink);
    if (!link) {
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
    var videoID = "";
    var link = "";

    var result = userLink.search("watch");    
    if (result > 0) {
      var index = result + "watch?v=".length;
      videoID = userLink.substring(index);
      link = userLink.replace("watch?v=", "embed/");
    }
    else {
      videoID = userLink;
      link = coreLink.concat(userLink);
    }

    result = checkLink(videoID);
    if (!result) {
      return false;
    }
    link = link.concat(params, videoID);
    return link;
}

function checkLink(videoID) {
  link = "https://www.googleapis.com/youtube/v3/videos?part=id";
  apiKey = "AIzaSyB_8h_wB5FfhMaEh3MqZraRawrwgk1DTgc__"
  params = "&id=".concat(videoID, "&key=", apiKey);
  link = link.concat(params);
  $.get(link, function(data, status) {})
  .done(function() {
    return true;
  })
  .fail(function() {
    return false;
  });
}
