'use strict';

describe('Service: OrganizationLoad', function () {

  // load the service's module
  beforeEach(module('yeodjangoApp'));

  // instantiate service
  var OrganizationLoad;
  beforeEach(inject(function (_OrganizationLoad_) {
    OrganizationLoad = _OrganizationLoad_;
  }));

  it('should do something', function () {
    expect(!!OrganizationLoad).toBe(true);
  });

});
