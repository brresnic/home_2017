function adjustMenuItems() {
  var position = $(this).scrollTop();
  // console.log('position ' + position);

  $('.section').each(function() {
      var target = $(this).offset().top;
      var id = $(this).attr('id');

      if (position + 130 >= target) {
          console.log(id);
          $('#sticky-nav > a').removeClass('active');
          $('#sticky-nav > a[href="#' + id + '"]').addClass('active');
      }
  });
}

$( document ).ready(function() {
  $(window).scroll(function() {
    adjustMenuItems();
  });

});

window.addEventListener("hashchange", function () {
    window.scrollTo(window.scrollX, window.scrollY - 50);
});
