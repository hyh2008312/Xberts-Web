'use strict';

describe('Filter: split', function () {

  // load the filter's module
  beforeEach(module('yeodjangoApp'));

  // initialize a new instance of the filter before each test
  var split;
  beforeEach(inject(function ($filter) {
    split = $filter('split');
  }));

  it('should return the input prefixed with "split filter:"', function () {
    var text = 'angularjs';
    expect(split(text)).toBe('split filter: ' + text);
  });

});
