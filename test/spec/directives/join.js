'use strict';

describe('Directive: join', function () {

  // load the directive's module
  beforeEach(module('yeodjangoApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<join></join>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the join directive');
  }));
});
