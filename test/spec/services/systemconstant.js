'use strict';

describe('Service: SystemConstant', function () {

  // load the service's module
  beforeEach(module('xbertsApp'));

  // instantiate service
  var SystemConstant;
  beforeEach(inject(function (_SystemConstant_) {
    SystemConstant = _SystemConstant_;
  }));

  it('should do something', function () {
    expect(!!SystemConstant).toBe(true);
  });

});
