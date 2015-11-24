'use strict';

describe('Service: ProfileReviewer', function () {

  // load the service's module
  beforeEach(module('yeodjangoApp'));

  // instantiate service
  var ProfileReviewer;
  beforeEach(inject(function (_ProfileReviewer_) {
    ProfileReviewer = _ProfileReviewer_;
  }));

  it('should do something', function () {
    expect(!!ProfileReviewer).toBe(true);
  });

});
