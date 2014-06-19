$(document).ready(function() {
	
	var isOnline;
	
	$(function(){
		$("[data-hide]").on("click", function(){
			$("." + $(this).attr("data-hide")).hide(600);
		});
	});
	
	$(function(){
		$("#downloadButton").on("click", function(){
			window.location.reload();
		});
	});
	
	// Check application cache status every 30 seconds
	setInterval(function(){
		if(isOnline){
			if(window.applicationCache.status != window.applicationCache.UNCACHED)
				window.applicationCache.update();
		 }
	}, 30000);
	
	function reportOnlineStatus() {
		isOnline = navigator.onLine;
		
		if (isOnline) {
			$("#onlineStatus").removeClass("btn-danger").addClass("btn-success");
			$("#uploadButton, #fileUpload").css("display", "inline-block");
		} else {			
			$("#onlineStatus").removeClass("btn-success").addClass("btn-danger");
			$("#uploadButton, #fileUpload").css("display", "none");
		}
	}
	
	function updateCacheStatus(updateAvailable) {
		$("#downloadButton").css("display", updateAvailable ? "inline-block" : "none");
		$("#latestButton").css("display", updateAvailable ? "none" : "inline-block");		
	}
	
	if (window.applicationCache) {
		window.addEventListener("online", function(e) {
			reportOnlineStatus();
		}, true);
		
		window.addEventListener("offline", function(e) {
			reportOnlineStatus();
		}, true);
		
		window.applicationCache.addEventListener("updateready", function(e) {
			updateCacheStatus(true);
		}, true);		
		
		reportOnlineStatus();
		updateCacheStatus(false);
	}
});