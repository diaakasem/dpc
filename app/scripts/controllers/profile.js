'use strict';
(function() {

    function controller(scope) {
        var Person = Parse.Object.extend("person");
        var person;

        function saveProfile() {
            if (scope.model.skillsText && scope.model.skillsText.length) {
                scope.model.skills = scope.model.skillsText.split(",");
                scope.model.skills = _.map(scope.model.skills, function(skill) {
                    return skill.trim();
                });
            } else {
                scope.model.skills = [];
            }
            person.save(scope.model, {
                success: function(person) {
                    // TODO: ADD ALERT SAVED CORRECTLY
                    alert("Success..");
                },
                error: function(person, error) {
                }
            });

        }

        scope.model = { };

        var Profile = Parse.Object.extend("person");
        var objectId = localStorage.getItem("objectId");
        var Team = Parse.Object.extend("team");
        var Project = Parse.Object.extend("project");

        scope.load = function() {
            person = scope.user.get('profile');

            person.fetch({
                success: function(model) {
                    scope.$apply(function() {
                        scope.model.first_name = model.get('first_name');
                        scope.model.last_name = model.get('last_name');
                        scope.model.display_name = model.get('display_name');
                        scope.model.skillsText = (model.get('skills') || [] ).join(", ");
                        scope.model.bio = model.get('bio');
                        scope.model.country = model.get('country');
                    });
                }
            });

            var teamQuery = new Parse.Query(Team);
            var projectQuery = new Parse.Query(Project);
            teamQuery.find({
                success:function(list) {
                    scope.$apply(function() {
                        scope.teams = list;
                    });
                }
            });
            projectQuery.find({
                success:function(list) {
                    scope.$apply(function() {
                        scope.projects = list;
                    });
                }
            });
        };

        // Preloading
        scope.load();

        scope.update = function(model) {
            saveProfile();
        };
    }

    angular.module('dpcApp')
        .controller('ProfileCtrl', ['$scope', controller]);

}).call(null);

