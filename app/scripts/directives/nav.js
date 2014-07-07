'use strict';
(function() {

    function controller(root, scope, location) {
        scope.$on('$routeChangeStart', function(next, current) { 
            scope.path = location.path();
        });

        scope.logout = function() {
            Parse.User.logOut();
            delete root.user;
            scope.go('/');
        };
    }

    angular.module('dpcApp')
    .directive('nav', function () {
        return {
            templateUrl: 'views/nav.html',
            restrict: 'E',
            controller: ['$rootScope', '$scope', '$location', controller]
        };
    });
}).call(null);
