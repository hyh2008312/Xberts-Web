'use strict';

describe('Filter: decode', function () {

  // load the filter's module
  beforeEach(module('xbertsApp'));

  // initialize a new instance of the filter before each test
  var decode;
  beforeEach(inject(function ($filter) {
    decode = $filter('decode');
  }));

  it('should return the input prefixed with "decode filter:"', function () {
    var text = 'angularjs';
    expect(decode(text)).toBe('decode filter: ' + text);
  });

});
