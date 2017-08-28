$(document).ready(function(){
	$("#title").hide();
	$("#footer").hide();
	$("#bg").hide();
	$("#s7").hide();
	$("#bg").fadeIn(3000, function(){
		$("#title").fadeIn(3000);
		$("#s7").fadeIn(3000);
		$("#footer").fadeIn(8000);
	});
});


