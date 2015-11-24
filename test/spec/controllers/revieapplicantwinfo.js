'use strict';

describe('Controller: ReviewapplicantinfoCtrl', function () {

  // load the controller's module
  beforeEach(module('yeodjangoApp'));

  var ReviewapplicantinfoCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ReviewapplicantinfoCtrl = $controller('ReviewapplicantinfoCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ReviewapplicantinfoCtrl.awesomeThings.length).toBe(3);
  });
});
