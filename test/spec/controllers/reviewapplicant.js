'use strict';

describe('Controller: ReviewapplicantCtrl', function () {

  // load the controller's module
  beforeEach(module('yeodjangoApp'));

  var ReviewapplicantCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ReviewapplicantCtrl = $controller('ReviewapplicantCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ReviewapplicantCtrl.awesomeThings.length).toBe(3);
  });
});
