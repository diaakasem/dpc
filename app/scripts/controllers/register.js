'use strict';
(function() {

    function controller(scope, location) {

        scope.security = {};
        scope.model = {};

        var Person = Parse.Object.extend("person");
        var person = new Person();
        var User = new Parse.User();
        var Team = Parse.Object.extend("team");
        var Project = Parse.Object.extend("project");

        function saveProfile(user) {
            if (scope.model.skillsText && scope.model.skillsText.length) {
                scope.model.skills = scope.model.skillsText.split(",");
                delete scope.model.skillsText;
                scope.model.skills = _.map(scope.model.skills, function(skill) {
                    return skill.trim();
                });
            } else {
                scope.model.skills = [];
            }
            scope.user = user;

            person.save(scope.model, {
                success: function(person) {
                    scope.user.set("profile", person);
                    scope.user.save(null, {
                        success: function(user) {
                            location.path("login");
                            scope.$apply();
                        },
                        error: function(user, error) {
                        }
                    });
                },
                error: function(person, error) {
                }
            });

        }

        scope.load = function() {
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

        scope.register = function(model) {

            User.set("username", scope.security.username);
            User.set("password", scope.security.password);
            User.set("email", scope.security.email);

            User.signUp(null, {
                success: function(user) { 
                    saveProfile(user);
                },
                error: function(user, error) {
                    alert("Error: " + error.code + " " + error.message);
                }
            });

        };
    }

    angular.module('dpcApp')
        .controller('RegisterCtrl', ['$scope', '$location', controller]);

}).call(null);
