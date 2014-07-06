'use strict';
(function() {

    function controller(scope) {

        scope.model = { };

        var Profile = Parse.Object.extend("person");
        var objectId = localStorage.getItem("objectId");

        scope.load = function() {
            var query = new Parse.Query(Profile);
            //query.equalTo("title", "I'm Hungry");
            query.get(objectId, {
                success:function(person) {
                    scope.model = person;
                }
            });
        };

        // Preloading
        scope.load();
    }

    angular.module('dpcApp')
        .controller('ProfileCtrl', ['$scope', controller]);

}).call(null);

