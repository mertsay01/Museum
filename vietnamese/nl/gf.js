$(document).ready(function() {
    $(".toggle-button").click(function() {
      $(this).parent().find("ul").slideToggle(function() {
        // Animation complete.
      });
    });
  })