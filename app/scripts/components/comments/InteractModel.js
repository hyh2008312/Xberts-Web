angular.module('xbertsApp')
  .factory('Interact', InteractModel);

function InteractModel() {
  function Interact(data) {
    angular.extend(this, data);
  }

  Interact.build = function (data) {
    var interact = new Interact(data);
    return interact;
  };

  return Interact;
}
