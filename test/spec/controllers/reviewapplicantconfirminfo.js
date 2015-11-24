'use strict';

describe('Controller: ReviewapplicantconfirminfoCtrl', function () {

  // load the controller's module
  beforeEach(module('yeodjangoApp'));

  var ReviewapplicantconfirminfoCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ReviewapplicantconfirminfoCtrl = $controller('ReviewapplicantconfirminfoCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ReviewapplicantconfirminfoCtrl.awesomeThings.length).toBe(3);
  });
});
