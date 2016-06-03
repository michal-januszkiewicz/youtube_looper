$(document).ready(function() {
  $(".search").click(function() {
    var coreLink = "https://www.youtube.com/embed/"
    var userLink = $(".video-link").val();
    var link = prepareLink(userLink);
    $(".video").attr("src", link).show();
  });
});

function prepareLink(userLink) {
    var videoID = "";
    var link = "";
    var params = "?autohide=1&iv_load_policy=3&loop=1&rel=0&playlist=";

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

    link = link.concat(params, videoID);
    return link;
}
