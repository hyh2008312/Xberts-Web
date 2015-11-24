'use strict';

describe('Service: Review', function () {

  // load the service's module
  beforeEach(module('yeodjangoApp'));

  // instantiate service
  var Review;
  beforeEach(inject(function (_Review_) {
    Review = _Review_;
  }));

  it('should do something', function () {
    expect(!!Review).toBe(true);
  });

});
