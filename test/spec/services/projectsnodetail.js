'use strict';

describe('Service: ProjectsNoDetail', function () {

  // load the service's module
  beforeEach(module('xbertsApp'));

  // instantiate service
  var ProjectsNoDetail;
  beforeEach(inject(function (_ProjectsNoDetail_) {
    ProjectsNoDetail = _ProjectsNoDetail_;
  }));

  it('should do something', function () {
    expect(!!ProjectsNoDetail).toBe(true);
  });

});
