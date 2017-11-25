$( document ).ready(function() {
  $( window ).resize(function() {
    console.log($('#map-img').height());
    $('#main').height($('#map-img').height());
  });
  $( "#map-img" ).load(function() {
  	$('#main').height($('#map-img').height());
  });

  var duration = 740;
  for(i = 1; i<11; i++){
	  $('#main a:nth-child('+i.toString()+') img').animate({
	    opacity: 1
	  }, duration, function() {
	    // Animation complete.
	    if(duration == 3540){ //on last fade, fade song
	    	$('#sail-song').animate({
	    		opacity: 1
	  		},1000, function() {
	    		// Animation complete.
  			});
	    }

	  });
	  duration += 280;	
  } 

});