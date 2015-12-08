'use strict';

describe('Service: Distributor', function () {

  // load the service's module
  beforeEach(module('xbertsApp'));

  // instantiate service
  var Distributor;
  beforeEach(inject(function (_Distributor_) {
    Distributor = _Distributor_;
  }));

  it('should do something', function () {
    expect(!!Distributor).toBe(true);
  });

});
