'use strict';
(function() {

    function controller(scope) {

        scope.model = {};

        var Person = Parse.Object.extend("person");

        scope.register = function(model) {
            var person = new Person();

            person.save(scope.model, {
                success: function(person) {
                             alert("Done");
                         },
                error: function(person, error) {
                       }
            });

        };

    }

    angular.module('dpcApp').controller('RegisterCtrl', ['$scope', controller]);

}).call(null);
