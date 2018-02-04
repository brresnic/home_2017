$( document ).ready(function() {
// register a function that is triggered on scroll
  $(window).scroll(function() {
    var position = $(this).scrollTop();
    if(position > 120) {
      $('#mobileHam').addClass('cleared');
    } else {
      $('#mobileHam').removeClass('cleared');
    }
  });
});
