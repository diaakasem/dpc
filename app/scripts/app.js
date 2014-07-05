'use strict';

(function() {

var dpcModule = angular
  .module('dpcApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute'
  ]);

dpcModule.config(function ($routeProvider) {

    Parse.initialize("WSGMmizuVjklAI6SpdIMBypeDCzKPUAo05QpWUnV",
                    "OVNmBrjWj4ggScDNvKf159pVQM89vyNTlRIOIh4u")

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
      .otherwise({
        redirectTo: '/'
      });
  });

}).call(null);
