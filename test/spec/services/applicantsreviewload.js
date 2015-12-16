'use strict';

describe('Service: applicantsreviewLoad', function () {

  // load the service's module
  beforeEach(module('xbertsApp'));

  // instantiate service
  var applicantsreviewLoad;
  beforeEach(inject(function (_applicantsreviewLoad_) {
    applicantsreviewLoad = _applicantsreviewLoad_;
  }));

  it('should do something', function () {
    expect(!!applicantsreviewLoad).toBe(true);
  });

});
