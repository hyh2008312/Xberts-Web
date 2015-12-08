'use strict';

describe('Service: ProjectOnlyDetail', function () {

  // load the service's module
  beforeEach(module('xbertsApp'));

  // instantiate service
  var ProjectOnlyDetail;
  beforeEach(inject(function (_ProjectOnlyDetail_) {
    ProjectOnlyDetail = _ProjectOnlyDetail_;
  }));

  it('should do something', function () {
    expect(!!ProjectOnlyDetail).toBe(true);
  });

});
