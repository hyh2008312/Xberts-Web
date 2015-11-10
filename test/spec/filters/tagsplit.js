'use strict';

describe('Filter: tagsplit', function () {

  // load the filter's module
  beforeEach(module('yeodjangoApp'));

  // initialize a new instance of the filter before each test
  var tagsplit;
  beforeEach(inject(function ($filter) {
    tagsplit = $filter('tagsplit');
  }));

  it('should return the input prefixed with "tagsplit filter:"', function () {
    var text = 'angularjs';
    expect(tagsplit(text)).toBe('tagsplit filter: ' + text);
  });

});
