'use strict';

describe('Controller: XbertCtrl', function () {

  // load the controller's module
  beforeEach(module('xbertsApp'));

  var XbertCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    XbertCtrl = $controller('XbertCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(XbertCtrl.awesomeThings.length).toBe(3);
  });
});
