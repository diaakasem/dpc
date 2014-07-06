'use strict';

(function() {

var dpcModule = angular
  .module('dpcApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTable',
    'ui.bootstrap',
    'ngRoute'
  ]);

dpcModule.config(function ($routeProvider) {

    Parse.initialize("KQ6jSLHo3JOIiyIxjRSOe0IAQMO2MAxBAQTAhGys",
                    "SfrrVMjP8sxmPHjAM6Lpdp6FuS30EzMqm6FvsfjP")

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/teams', {
        templateUrl: 'views/teams.html',
        controller: 'TeamsCtrl'
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl'
      })
      .when('/teams', {
        templateUrl: 'views/teams.html',
        controller: 'TeamsCtrl'
      })
      .when('/projects', {
        templateUrl: 'views/projects.html',
        controller: 'ProjectsCtrl'
      })
      .when('/profile', {
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

}).call(null);
