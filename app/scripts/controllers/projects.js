'use strict';
(function() {

    function controller(scope, filter, ngTableParams) {

        scope.model = {
            name:"",
            participants: []
        };

        scope.participants = [];

        var Project = Parse.Object.extend("project");

        scope.list = function() {
            var query = new Parse.Query(Project);
            //query.equalTo("title", "I'm Hungry");
            query.find({
                success:function(list) {
                    scope.participants = list;
                    scope.tableParams.reload();
                }
            });
        };

        // Preloading
        scope.list();

        scope.add = function(model) {
            var project = new Project();
            project.save(scope.model, {
                success: function(person) {
                             scope.list();
                         },
                error: function(person, error) {
                       }
            });
        };

        scope.remove = function(model) {
            model.destroy({
                success: function(person) {
                             alert("Removed");
                             scope.list();
                         },
                error: function(person, error) {
                       }
            });
        };

        function getData() {
            return scope.participants;
        }

        scope.tableParams = new ngTableParams({
            page: 1,            // show first page
            count: 10,           // count per page
            sorting: {
                name: 'asc'     // initial sorting
            }
        }, {
            total: function () { return getData().length; },
            getData: function($defer, params) {
                var filteredData = getData();
                var orderedData = params.sorting() ?  filter('orderBy')(filteredData, params.orderBy()) : filteredData;
                $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
            }
        });

    }

    angular.module('dpcApp').controller('ProjectsCtrl', ['$scope', '$filter', 'ngTableParams', controller]);

}).call(null);

