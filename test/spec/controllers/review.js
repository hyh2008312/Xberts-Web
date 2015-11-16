'use strict';

describe('Controller: ReviewCtrl', function () {

  // load the controller's module
  beforeEach(module('yeodjangoApp'));

  var ReviewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ReviewCtrl = $controller('ReviewCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ReviewCtrl.awesomeThings.length).toBe(3);
  });
});
