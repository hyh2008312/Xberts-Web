'use strict';

describe('Service: ReviewReport', function () {

  // load the service's module
  beforeEach(module('xbertsApp'));

  // instantiate service
  var ReviewReport;
  beforeEach(inject(function (_ReviewReport_) {
    ReviewReport = _ReviewReport_;
  }));

  it('should do something', function () {
    expect(!!ReviewReport).toBe(true);
  });

});
