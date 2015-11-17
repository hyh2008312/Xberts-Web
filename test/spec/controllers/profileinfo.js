'use strict';

describe('Controller: ProfileinfoCtrl', function () {

  // load the controller's module
  beforeEach(module('yeodjangoApp'));

  var ProfileinfoCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProfileinfoCtrl = $controller('ProfileinfoCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ProfileinfoCtrl.awesomeThings.length).toBe(3);
  });
});
