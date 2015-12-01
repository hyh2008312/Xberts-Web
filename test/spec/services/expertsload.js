'use strict';

describe('Service: ExpertsLoad', function () {

  // load the service's module
  beforeEach(module('xbertsApp'));

  // instantiate service
  var ExpertsLoad;
  beforeEach(inject(function (_ExpertsLoad_) {
    ExpertsLoad = _ExpertsLoad_;
  }));

  it('should do something', function () {
    expect(!!ExpertsLoad).toBe(true);
  });

});
