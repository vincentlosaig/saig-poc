$(document).ready(function() {
	$(function(){
		$("[data-hide]").on("click", function(){
			$("." + $(this).attr("data-hide")).hide(600);
		});
	});
});