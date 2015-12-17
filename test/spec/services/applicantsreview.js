'use strict';

describe('Service: applicantsreview', function () {

  // load the service's module
  beforeEach(module('xbertsApp'));

  // instantiate service
  var applicantsreview;
  beforeEach(inject(function (_applicantsreview_) {
    applicantsreview = _applicantsreview_;
  }));

  it('should do something', function () {
    expect(!!applicantsreview).toBe(true);
  });

});
