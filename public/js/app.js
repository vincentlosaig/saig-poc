'use strict';

// Declare app level module which depends on filters, and services

angular.module('auditApp', ['ngRoute', 'ui.bootstrap', 'auditApp.filters', 'auditApp.services', 'auditApp.directives'])
	.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
		$routeProvider.
			when('/', {
				templateUrl: 'partials/index',
				controller: 'MainController'
			}).
			otherwise({
				templateUrl: 'partials/error',
				controller: 'MainController'
			});
		
		$locationProvider.html5Mode(true);
		var original = $locationProvider.path;
		$locationProvider.path = function (path, reload) {
			if (reload === false) {
				var lastRoute = $route.current;
				var un = $rootScope.$on('$locationChangeSuccess', function () {
					$route.current = lastRoute;
					un();
				});
			}
			return original.apply($locationProvider, [path]);
		};
	}]);