$( document ).ready(function() {
  $('#yl').hover(function() {
      $('#ylh').fadeIn('400');
  }, function() {
    if($( document ).width() > 729){    
      $('#ylh').fadeOut('400');
    }
  });

  $('#mm').hover(function() {
      $('#mmh').fadeIn('400');
  }, function() {
    if($( document ).width() > 729){
      $('#mmh').fadeOut('400');
    }
  });

  $('#h2').hover(function() {
      $('#h2h').fadeIn('400');
  }, function() {
    if($( document ).width() > 729){
      $('#h2h').fadeOut('400');
    }
  });

});