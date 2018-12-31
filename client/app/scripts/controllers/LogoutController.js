'use strict';

/**
 * @ngdoc function
 * @name ferariApp.controller:LogoutController
 * @description
 * # LogoutController
 * Controller of the ferariApp
 */
 
angular.module('ferariApp').controller('LogoutController',
  ['$scope', '$location', 'AuthenticationService',
  function ($scope, $location, AuthenticationService) {

    $scope.logout = function () {

      // call logout from service
      AuthenticationService.logout()
        .then(function () {
          $location.path('/login');
        });

    };

}]);