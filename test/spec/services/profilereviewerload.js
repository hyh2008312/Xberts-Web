'use strict';

describe('Service: ProfileReviewerLoad', function () {

  // load the service's module
  beforeEach(module('yeodjangoApp'));

  // instantiate service
  var ProfileReviewerLoad;
  beforeEach(inject(function (_ProfileReviewerLoad_) {
    ProfileReviewerLoad = _ProfileReviewerLoad_;
  }));

  it('should do something', function () {
    expect(!!ProfileReviewerLoad).toBe(true);
  });

});
