'use strict';
(function() {

    function controller(root, scope) {
        scope.security = {};

        if (scope.user) {
            scope.go('/');
        }

        scope.onSuccess = function(user) {
            root.user = user;
            scope.go('/');
            scope.$apply();
        };

        scope.onError = function(user, error) {
            scope.error = "Please, check your username and password.";
            return console.log(scope.error);
        };

        scope.login = function(security) {
            console.log(security);
            Parse.User.logIn(security.username, security.password, {
                success: scope.onSuccess,
                error: scope.onError
            });
        };
    }

    angular.module('dpcApp')
    .controller('LoginCtrl', ['$rootScope', '$scope', controller]);

}).call(null);
