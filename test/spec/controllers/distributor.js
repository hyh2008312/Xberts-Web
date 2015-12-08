'use strict';

describe('Controller: DistributorCtrl', function () {

  // load the controller's module
  beforeEach(module('xbertsApp'));

  var DistributorCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DistributorCtrl = $controller('DistributorCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(DistributorCtrl.awesomeThings.length).toBe(3);
  });
});
