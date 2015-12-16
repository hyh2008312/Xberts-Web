'use strict';

describe('Controller: ReviewreportCtrl', function () {

  // load the controller's module
  beforeEach(module('xbertsApp'));

  var ReviewreportCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ReviewreportCtrl = $controller('ReviewreportCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ReviewreportCtrl.awesomeThings.length).toBe(3);
  });
});
