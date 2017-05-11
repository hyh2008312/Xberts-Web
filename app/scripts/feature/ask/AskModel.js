angular.module('xbertsApp')
  .factory('AskModel', ['urlParser','$sce','$state',AskModel]);
function AskModel(urlParser, $sce, $state) {

  function AskModel(data) {
    angular.extend(this, data);
  }

  AskModel.prototype = {
  };

  AskModel.build = function (data) {
    return new ShareProduct(data)
  };

  AskModel.buildPageList = function (data) {
    data.results = data.results.map(function (item) {
      return AskModel.build(item);
    });

    return data;
  };

  AskModel.buildList = function (data) {
    return data.map(function (item) {
      return AskModel.build(item);
    })
  };

  return AskModel;
}
