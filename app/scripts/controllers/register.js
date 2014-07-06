'use strict';
(function() {

    function controller(scope) {

        scope.model = {};

        var Person = Parse.Object.extend("person");

        scope.register = function(model) {
            if (model.skills && model.skills.length) {
                model.skills = model.skillsText.split(",");
            } else {
                model.skills = [];
            }
            model.skills = _.map(model.skills, function(skill) {
                return skill.trim();
            });
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
