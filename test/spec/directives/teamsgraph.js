'use strict';

describe('Directive: teamsgraph', function () {

  // load the directive's module
  beforeEach(module('dpcApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<teamsgraph></teamsgraph>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the teamsgraph directive');
  }));
});
