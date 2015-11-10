'use strict';

describe('Service: DistributionLoad', function () {

  // load the service's module
  beforeEach(module('yeodjangoApp'));

  // instantiate service
  var DistributionLoad;
  beforeEach(inject(function (_DistributionLoad_) {
    DistributionLoad = _DistributionLoad_;
  }));

  it('should do something', function () {
    expect(!!DistributionLoad).toBe(true);
  });

});
