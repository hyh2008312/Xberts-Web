'use strict';

describe('Service: EventLoad', function () {

  // load the service's module
  beforeEach(module('yeodjangoApp'));

  // instantiate service
  var EventLoad;
  beforeEach(inject(function (_EventLoad_) {
    EventLoad = _EventLoad_;
  }));

  it('should do something', function () {
    expect(!!EventLoad).toBe(true);
  });

});
