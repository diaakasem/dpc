'use strict';

angular.module('dpcApp')
  .directive('teamsgraph', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the teamsgraph directive');
      }
    };
  });
