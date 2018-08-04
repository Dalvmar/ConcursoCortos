$(function() {
	$(window).scroll(function() {
		if ($(this).scrollTop() > 100) {
			$('.scrollToTop').fadeIn();
		} else {
			$('.scrollToTop').fadeOut();
		}
	});
	$('.scrollToTop').click(function() {
		$('html, body').animate({scrollTop : 0},800);
		return false;
	});
	$.scrollify({
		section: "section",
		sectionName: "page"
	});
	$('#aa').click(function(){
		$.scrollify.move('#about');
	});
	$('#at').click(function(){
		$.scrollify.move('#team');
	});
	$('#as').click(function(){
		$.scrollify.move('#services');
	});
	$('#ac').click(function(){
		$.scrollify.move('#contact');
	});
	$(".circle")
		.circleProgress({
			fill: {gradient: ['#ff1e41', '#ff5f43']},
			value: 0.6
		})
		.on("circle-animation-progress", function(event, progress) {
			$(this)
				.find("strong")
				.html(Math.round(60 * progress) + "<i>%</i>");
		});
});
