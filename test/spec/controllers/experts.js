'use strict';

describe('Controller: ExpertsCtrl', function () {

  // load the controller's module
  beforeEach(module('yeodjangoApp'));

  var ExpertsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ExpertsCtrl = $controller('ExpertsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ExpertsCtrl.awesomeThings.length).toBe(3);
  });
});
