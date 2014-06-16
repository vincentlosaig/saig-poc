'use strict';

function MainController($scope, $http) {
	$scope.responses = {};

	if (typeof window.localStorage != "undefined") {
		if (localStorage.getItem("Responses") != null) {
			$scope.responses = JSON.parse(localStorage.getItem("Responses"));
			console.log("Loaded response: " + $scope.responses);			
		}
	}
	
    $http.get('/json/schemas.json').
		success(function(data) {
			$scope.questions = data['schema']['audit'].questions;
		});
		
	$scope.submit = function(response) {
		console.log("Saving response: " + response);
		$scope.responses = angular.copy(response);		
		
		if (typeof window.localStorage != "undefined") {
			localStorage.setItem("Responses", JSON.stringify($scope.responses));
		}
	};
}