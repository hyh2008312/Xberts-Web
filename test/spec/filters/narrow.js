'use strict';

describe('Filter: narrow', function () {

  // load the filter's module
  beforeEach(module('xbertsApp'));

  // initialize a new instance of the filter before each test
  var narrow;
  beforeEach(inject(function ($filter) {
    narrow = $filter('narrow');
  }));

  it('should return the input prefixed with "narrow filter:"', function () {
    var text = 'angularjs';
    expect(narrow(text)).toBe('narrow filter: ' + text);
  });

});
