'use strict';

/**
 * @ngdoc directive
 * @name xbertsApp.directive:QuestionInput
 * @description
 * # QuestionInput
 */
angular.module('xbertsApp')
  .directive('questionInput', function () {
    return {
      templateUrl: "views/questiondirect.html",
      replace: true,
      scope: {
        question: "="
      },
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        //element.text('this is the QuestionInput directive');
        if (scope.question.answer == undefined) {
          scope.question.answer = {};
        }
        function checkBoxRequired() {
          scope.itemsSelected = [];
          for (var i = 0; i < scope.items.length; i++) {
            if (scope.items[i].selected) {
              scope.itemsSelected.push(scope.items[i].name);
            }
          }
          return scope.itemsSelected.length;
        }

        if (scope.question.type === '5') {
          scope.question.error = true;
          scope.items = [];
          var items = scope.question.extra.split(',');
          var itemsSelected = [];
          if (scope.question.answer) {
            itemsSelected = scope.question.answer.answer_main.split(',');
          }
          scope.question.error = !itemsSelected.length > 0;
          var i;
          var j;
          for (i = 0; i < items.length; i++) {
            var item = {name: items[i], selected: false};
            for (j = 0; j < itemsSelected.length; j++) {
              if (itemsSelected[j] === item.name) {
                item.selected = true;
                break;
              }
            }
            scope.items.push(item);
          }
          console.log(scope.items);
          scope.$watch(checkBoxRequired, function () {
            if (scope.question.answer == undefined) {
              scope.question.answer = {};
            }
            scope.question.answer.answer_main = scope.itemsSelected.join(',');
            if (scope.question.answer.answer_main.indexOf('Other') == -1) {
              scope.question.answer.answer_other = undefined;
            }
            scope.question.error = scope.itemsSelected.length < 1;
          })
        }
        if (scope.question.type === '4') {
          console.log(scope.question.type);
          scope.$watch('question.answer.answer_main', function () {
            if (scope.question.answer == undefined) {
              scope.question.answer = {};
            }
            console.log("triggered");
            if (scope.question.answer.answer_main.indexOf('Other') == -1) {
              scope.question.answer.answer_other = undefined;
            }
          })
        }
      }
    };
  });
