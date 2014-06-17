$(document).ready(function() {

	var isOnline;
	
	$(function(){
		$("[data-hide]").on("click", function(){
			$("." + $(this).attr("data-hide")).hide(600);
		});
	});
	
	function reportOnlineStatus() {
		isOnline = navigator.onLine;
		
		if (isOnline) {
			$("#onlineStatus").removeClass("btn-danger").addClass("btn-success");
			$("uploadButton").attr("disabled", false);
		} else {			
			$("#onlineStatus").removeClass("btn-success").addClass("btn-danger");
			$("uploadButton").attr("disabled", true);
		}
	}
	
	if (window.applicationCache) {
		window.addEventListener("online", function(e) {
			reportOnlineStatus();
		}, true);
		
		window.addEventListener("offline", function(e) {
			reportOnlineStatus();
		}, true);
		
		reportOnlineStatus();
	}
});