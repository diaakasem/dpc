'use strict';

angular.module('dpcApp')
  .directive('nav', function () {
    return {
      templateUrl: 'views/nav.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
      }
    };
  });
