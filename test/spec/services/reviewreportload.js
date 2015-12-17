'use strict';

describe('Service: ReviewReportLoad', function () {

  // load the service's module
  beforeEach(module('xbertsApp'));

  // instantiate service
  var ReviewReportLoad;
  beforeEach(inject(function (_ReviewReportLoad_) {
    ReviewReportLoad = _ReviewReportLoad_;
  }));

  it('should do something', function () {
    expect(!!ReviewReportLoad).toBe(true);
  });

});
