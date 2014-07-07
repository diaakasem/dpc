'use strict';
(function() {

    function controller(scope) {

        scope.model = { };

        var Profile = Parse.Object.extend("person");
        var objectId = localStorage.getItem("objectId");

        scope.load = function() {
            scope.model = scope.user.get('profile');
            scope.model.fetch({
                success: function(model) {
                    scope.model = model;
                }
            });
        };

        // Preloading
        scope.load();
    }

    angular.module('dpcApp')
        .controller('ProfileCtrl', ['$scope', controller]);

}).call(null);

