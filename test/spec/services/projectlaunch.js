'use strict';

describe('Service: projectLaunch', function () {

  // load the service's module
  beforeEach(module('yeodjangoApp'));

  // instantiate service
  var projectLaunch;
  beforeEach(inject(function (_projectLaunch_) {
    projectLaunch = _projectLaunch_;
  }));

  it('should do something', function () {
    expect(!!projectLaunch).toBe(true);
  });

});
