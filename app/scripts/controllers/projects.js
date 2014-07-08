'use strict';
(function() {

    function controller(scope, filter, ngTableParams) {

        scope.model = {
            name:"",
            participants: []
        };

        scope.participants = [];

        var Person = Parse.Object.extend("person");
        var Project = Parse.Object.extend("project");

        scope.load = function() {
            var query = new Parse.Query(Person);
            query.include(["project"]);
            query.find({
                success:function(list) {
                    var structuredData = _.map(list, function(member) {
                        var project = member.get("project"),
                            projectName;
                        if (project) {
                            projectName = project.get("name");
                        } else {
                            projectName = "Unknown Project";
                        }
                        return {
                            name: member.get("display_name"),
                            data: member,
                            project_name: projectName,
                            project: member.get("project"),
                            size: 1
                        };
                    });
                    var projects = _(structuredData).groupBy('project_name').map(function(value, key) {
                        return {
                            name: key,
                            children: value
                        }
                    }).value();
                    scope.projectsGraph  = {
                        name: "Projects",
                        children: projects
                    };
                    scope.$apply();
                }
                , error: function(data, error) {
                    console.log(error);
                }
            });
        };

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
        scope.load();

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

