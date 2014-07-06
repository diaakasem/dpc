'use strict';
(function() {

    function controller(scope, filter, ngTableParams) {

        scope.model = { };

        var Profile = Parse.Object.extend("person");

        scope.list = function() {
            var query = new Parse.Query(Profile);
            //query.equalTo("title", "I'm Hungry");
            query.find({
                success:function(list) {
                            scope.participants = list;
                            scope.tableParams.reload();
                        }
            });
        };

        // Preloading
        scope.load();

        scope.update = function(model) {
            var profile = new Profile();
            profile.save(scope.model, {
                success: function(person) {
                    scope.list();
                },
                error: function(person, error) {
                }
            });
        };

    }

    angular.module('dpcApp').controller('ProfileCtrl', ['$scope', '$filter', 'ngTableParams', controller]);

}).call(null);

