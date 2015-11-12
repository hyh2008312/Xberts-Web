'use strict';

describe('Service: ProjectsLoad', function () {

  // load the service's module
  beforeEach(module('yeodjangoApp'));

  // instantiate service
  var ProjectsLoad;
  beforeEach(inject(function (_ProjectsLoad_) {
    ProjectsLoad = _ProjectsLoad_;
  }));

  it('should do something', function () {
    expect(!!ProjectsLoad).toBe(true);
  });

});
