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
                        "SfrrVMjP8sxmPHjAM6Lpdp6FuS30EzMqm6FvsfjP");

        $routeProvider
        .when('/', {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl',
            access: 'public'
        })
        .when('/register', {
            templateUrl: 'views/register.html',
            controller: 'RegisterCtrl',
            access: 'public'
        })
        .when('/teams', {
            templateUrl: 'views/teams.html',
            controller: 'TeamsCtrl',
            access: 'user'
        })
        .when('/projects', {
            templateUrl: 'views/projects.html',
            controller: 'ProjectsCtrl',
            access: 'user'
        })
        .when('/profile', {
            templateUrl: 'views/profile.html',
            controller: 'ProfileCtrl',
            access: 'user'
        })
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl',
            access: 'public'
        })
        .otherwise({
            redirectTo: '/'
        });
    });

    function rootController(root, location) {
        root.go = function(url) {
            return location.path('/' + url);
        };
        root.user = Parse.User.current();
        return root.$on('$routeChangeStart', function(event, next) {
            if (next.access !== 'public' && !root.user) {
                return root.go('login');
            }
        });
    }

    dpcModule.run(['$rootScope', '$location', rootController]);
}).call(null);
