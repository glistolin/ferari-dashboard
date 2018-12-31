'use strict';

angular.module('ferariApp')
.controller('DragulaCtrl', ['$scope', 'dragulaService',  function ($scope, dragulaService) {
    dragulaService.options($scope, 'drag', {
        accepts: function (el, target, source, sibling) {
             return true;
        }
    });
}]); 