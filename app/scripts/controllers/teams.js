'use strict';
(function() {

    function controller(scope, filter, ngTableParams) {
        scope.teamsGraph  = {
            name: "Teams",
            children: []
        };

        scope.model = {
            name:"",
            participants: []
        };

        scope.teams = [];

        var Person = Parse.Object.extend("person");
        var Team = Parse.Object.extend("team");

        scope.load = function() {
            var query = new Parse.Query(Person);
            query.include(["team"]);
            query.find({
                success:function(list) {
                    var structuredData = _.map(list, function(member) {
                        return {
                            name: member.get("display_name"),
                            data: member,
                            team_name: member.get("team").get("name"),
                            team: member.get("team")
                        };
                    });
                    var teams = _(structuredData).groupBy('team_name').map(function(value, key) {
                        return {
                            name: key,
                            children: value
                        }
                    }).value();
                    scope.teamsGraph  = {
                        name: "Teams",
                        children: teams
                    };
                    scope.$apply();
                }
                , error: function(data, error) {
                    console.log(error);
                }
            });
        };

        scope.list = function() {
            var query = new Parse.Query(Team);
            //query.equalTo("title", "I'm Hungry");
            query.find({
                success:function(list) {
                    scope.teams = list;
                    scope.tableParams.reload();
                }
            });
        };

        // Preloading
        scope.list();
        scope.load();

        scope.add = function(model) {
            var team = new Team();
            team.save(scope.model, {
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
            return scope.teams;
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

    angular.module('dpcApp').controller('TeamsCtrl', ['$scope', '$filter', 'ngTableParams', controller]);

}).call(null);
