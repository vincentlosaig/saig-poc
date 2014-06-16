'use strict';

/* Directives */

angular.module('auditApp.directives', ['toggle-switch']).
  directive('appVersion', function (version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  });
