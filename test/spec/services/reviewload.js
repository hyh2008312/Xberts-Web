'use strict';

describe('Service: ReviewLoad', function () {

  // load the service's module
  beforeEach(module('yeodjangoApp'));

  // instantiate service
  var ReviewLoad;
  beforeEach(inject(function (_ReviewLoad_) {
    ReviewLoad = _ReviewLoad_;
  }));

  it('should do something', function () {
    expect(!!ReviewLoad).toBe(true);
  });

});
