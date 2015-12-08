'use strict';

describe('Service: Interact', function () {

  // load the service's module
  beforeEach(module('yeodjangoApp'));

  // instantiate service
  var Interact;
  beforeEach(inject(function (_Interact_) {
    Interact = _Interact_;
  }));

  it('should do something', function () {
    expect(!!Interact).toBe(true);
  });

});
