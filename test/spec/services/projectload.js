'use strict';

describe('Service: ProjectLoad', function () {

  // load the service's module
  beforeEach(module('yeodjangoApp'));

  // instantiate service
  var ProjectLoad;
  beforeEach(inject(function (_ProjectLoad_) {
    ProjectLoad = _ProjectLoad_;
  }));

  it('should do something', function () {
    expect(!!ProjectLoad).toBe(true);
  });

});
