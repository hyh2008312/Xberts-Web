'use strict';

describe('Service: EventsLoad', function () {

  // load the service's module
  beforeEach(module('xbertsApp'));

  // instantiate service
  var EventsLoad;
  beforeEach(inject(function (_EventsLoad_) {
    EventsLoad = _EventsLoad_;
  }));

  it('should do something', function () {
    expect(!!EventsLoad).toBe(true);
  });

});
