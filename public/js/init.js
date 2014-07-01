function initialize() {		
	var isOnline;
	var requireUpdate = false;
	
	$(function(){
		$("[data-hide]").on("click", function(){
			$("." + $(this).attr("data-hide")).hide(600);
		});
	});
	
	$(function(){
		$("#cacheStatus").on("click", function(){
			if ($("#downloadIcon").is(":visible")) {
				window.location.reload();
			}
		});
	});

	// Check application cache status every 10 seconds
	setInterval(function(){
		if (isOnline) {
			if(!requireUpdate && window.applicationCache.status != window.applicationCache.UNCACHED) {
				$("#cacheStatus").removeClass("btn-warning").removeClass("btn-success");
				$("#loadingIcon").show();
				$("#downloadIcon, #latestIcon").hide();
				window.applicationCache.update(); // Update the cache in background. Won't take effect until reload.				
			}
		}
	}, 10000);	
	
	function reportOnlineStatus() {
		isOnline = navigator.onLine;
		
		if (isOnline) {
			$("#onlineStatus").removeClass("btn-danger").addClass("btn-success");
			$("#uploadButton, #fileUpload").show();
		} else {			
			$("#onlineStatus").removeClass("btn-success").addClass("btn-danger");
			$("#uploadButton, #fileUpload").hide();
		}
	}
	
	function updateCacheStatus() {				
		if (window.applicationCache.status == window.applicationCache.UPDATEREADY && isOnline) {
			$("#cacheStatus").removeClass("btn-success").addClass("btn-warning");
			$("#downloadIcon").show();
			$("#latestIcon, #loadingIcon").hide();		
			requireUpdate = true;
		} else {
			$("#cacheStatus").removeClass("btn-warning").addClass("btn-success");
			$("#latestIcon").show();
			$("#downloadIcon, #loadingIcon").hide();
		}
	}
	
	// Set up event listeners
	if (window.applicationCache) {
		window.addEventListener("online", function(e) {
			reportOnlineStatus();
			updateCacheStatus();
		}, true);
		
		window.addEventListener("offline", function(e) {
			reportOnlineStatus();
			updateCacheStatus();
		}, true);
		
		window.applicationCache.addEventListener("updateready", function(e) {
			updateCacheStatus();
		}, true);		
		
		window.applicationCache.addEventListener("checking", function(e) {
			updateCacheStatus();			
		}, true);
		
		window.applicationCache.addEventListener("noupdate", function(e) {
			updateCacheStatus();			
		}, true);
		
		reportOnlineStatus();
		updateCacheStatus();
		$("#loadingButton").hide();
	}	
}

function initializeErrorPage() {
	initialize();
	$("#saveButton, #uploadButton").hide();
}