'use strict';

describe('Service: ExpertLoad', function () {

  // load the service's module
  beforeEach(module('xbertsApp'));

  // instantiate service
  var ExpertLoad;
  beforeEach(inject(function (_ExpertLoad_) {
    ExpertLoad = _ExpertLoad_;
  }));

  it('should do something', function () {
    expect(!!ExpertLoad).toBe(true);
  });

});
