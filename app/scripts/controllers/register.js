'use strict';
(function() {

    function controller(scope, location) {

        scope.security = {};
        scope.model = {};

        var Person = Parse.Object.extend("person");
        var person = new Person();
        var User = new Parse.User();

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
                            alert("Done");
                        },
                        error: function(user, error) {
                        }
                    });
                    location.path("login");
                },
                error: function(person, error) {
                }
            });

        }

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
