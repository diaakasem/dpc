'use strict';
(function() {

    function controller(scope, location) {
        scope.$on('$routeChangeStart', function(next, current) { 
            scope.path = location.path();
        });
    }

    angular.module('dpcApp')
    .directive('nav', function () {
        return {
            templateUrl: 'views/nav.html',
            restrict: 'E',
            controller: ['$scope', '$location', controller]
        };
    });
}).call(null);
