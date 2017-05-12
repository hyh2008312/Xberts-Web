angular.module('xbertsApp')
  .factory('AskModel',AskModel);
function AskModel() {

  function AskModel(data) {
    angular.extend(this, data);
  }

  AskModel.prototype = {
  };

  AskModel.build = function (data) {
    return new AskModel(data)
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
