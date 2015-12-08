'use strict';

describe('Directive: feedbackDetail', function () {

  // load the directive's module
  beforeEach(module('xbertsApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<feedback-detail></feedback-detail>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the feedbackDetail directive');
  }));
});