$(document).ready(function() {
  $(".search").click(function() {
    var coreLink = "https://www.youtube.com/embed/"
    var userLink = $(".video-link").val();
    var link = "";

    link = coreLink.concat(userLink);
    if (userLink.search("watch") > 0) {
      link = userLink.replace("watch?v=", "embed/");
    }
    $(".video").attr("src", link);
  });
});
