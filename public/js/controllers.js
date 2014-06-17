'use strict';

function MainController($scope, $http) {
	$scope.responses = {};
	$scope.files = {};	
	
	$scope.setMessage = function (successMsg, failMsg) {
		if (successMsg == "") {
			$scope.failureMessage = failMsg;
			$(".alert-success").css("display", "none");
			$(".alert-danger").css("display", "block");
		} else if (failMsg == "") {
			$scope.successMessage = successMsg;
			$(".alert-danger").css("display", "none");
			$(".alert-success").css("display", "block");
		}
	};	
	
	if (typeof window.localStorage != "undefined") {
		var loaded = false;
		
		if (localStorage.getItem("Responses") != null) {
			$scope.responses = JSON.parse(localStorage.getItem("Responses"));
			console.log("Responses: " + localStorage.getItem("Responses"));
			loaded = true;
		} 
		
		if (localStorage.getItem("Files") != null) {
			$scope.files = JSON.parse(localStorage.getItem("Files"));
			console.log("Files: " + localStorage.getItem("Files"));
			loaded = true;
		} 

		if (loaded) {
			$scope.setMessage("Loaded responses/files from cache", "");
		} else {
			$scope.setMessage("", "Could not find responses/files in cache");
		}
	}
	
    $http.get('/json/schemas.json').
		success(function(data) {
			$scope.questions = data['schema']['audit'].questions;
		});
		
	$scope.$watchCollection('responses', function(newVal, oldVal) {			
		$("#uploadButton").attr("disabled", true);
		if (newVal !== oldVal) {
			$("#uploadButton").removeClass("btn-success");
			$("#saveButton").addClass("btn-danger");
		} 
	});
	
	$scope.upload = function(response, file) {
		$scope.setMessage("Uploaded", "");
		console.log("Uploading response: " + JSON.stringify(response));
		console.log("Uploading files: " + JSON.stringify(file));
		localStorage.clear();
	};
	
	$scope.submit = function(response, file) {
		console.log("Saving response: " + JSON.stringify(response));
		console.log("Saving files: " + JSON.stringify(file));
		$scope.responses = angular.copy(response);		
		$scope.files = angular.copy(file);
		
		if (typeof window.localStorage != "undefined") {
			$scope.setMessage("Saved", "");
			localStorage.setItem("Responses", JSON.stringify($scope.responses));
			localStorage.setItem("Files", JSON.stringify($scope.files));
			$("#saveButton").removeClass("btn-danger");
			$("#uploadButton").attr("disabled", false);			
			$("#uploadButton").addClass("btn-success");
		}
	};
}