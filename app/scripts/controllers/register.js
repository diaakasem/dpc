'use strict';
(function() {

    function controller(scope, location) {

        scope.model = {};

        var Person = Parse.Object.extend("person");

        scope.register = function(model) {
            if (model.skillsText && model.skillsText.length) {
                model.skills = model.skillsText.split(",");
                delete model.skillsText;
                model.skills = _.map(model.skills, function(skill) {
                    return skill.trim();
                });
            } else {
                model.skills = [];
            }
            var person = new Person();

            person.save(scope.model, {
                success: function(person) {
                    location.path("profile");
                },
                error: function(person, error) {
                }
            });

        };
    }

    angular.module('dpcApp')
        .controller('RegisterCtrl', ['$scope', '$location', controller]);

}).call(null);
