'use strict';

describe('Service: EventNoDetail', function () {

  // load the service's module
  beforeEach(module('yeodjangoApp'));

  // instantiate service
  var EventNoDetail;
  beforeEach(inject(function (_EventNoDetail_) {
    EventNoDetail = _EventNoDetail_;
  }));

  it('should do something', function () {
    expect(!!EventNoDetail).toBe(true);
  });

});
