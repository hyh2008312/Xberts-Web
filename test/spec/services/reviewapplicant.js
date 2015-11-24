'use strict';

describe('Service: ReviewApplicant', function () {

  // load the service's module
  beforeEach(module('yeodjangoApp'));

  // instantiate service
  var ReviewApplicant;
  beforeEach(inject(function (_ReviewApplicant_) {
    ReviewApplicant = _ReviewApplicant_;
  }));

  it('should do something', function () {
    expect(!!ReviewApplicant).toBe(true);
  });

});
